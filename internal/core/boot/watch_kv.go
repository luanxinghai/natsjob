package boot

import (
	"context"
	"natsjob/config"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"sync/atomic"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

// 针对是否master,只有master节点监听kv
var ctx, cancel = context.WithCancel(context.Background())

// 针对是否注册节点,所有节点都监听注册信息
var ctxReg, cancelReg = context.WithCancel(context.Background())

var subResultFlow *nats.Subscription

var (
	watchKvBool              = atomic.Bool{}
	watchJobResultsKVBool    = atomic.Bool{}
	watchSubResultFlowKvBool = atomic.Bool{}
)

var (
	watchRegKvBool       = atomic.Bool{}
	watchClientRegKvBool = atomic.Bool{}
	watchServerRegKvBool = atomic.Bool{}
)

func WatchKV(natsClient *enums.NatsClient) {
	if IsConnected() == false {
		logger.Error("watch kv fail, nats not connected")
		return
	}

	if watchKvBool.CompareAndSwap(false, true) {
		ctx, cancel = context.WithCancel(context.Background())
		watchJobResultsKV(natsClient)
		watchSubResultFlow(natsClient)
		//watchJobKeysKV(natsClient)
		logger.Info("watch job results keys kv")
	}
	//容错补偿,获取监听失败的时候重新监听
	if watchJobResultsKVBool.Load() == false {
		watchJobResultsKV(natsClient)
	}

	if watchSubResultFlowKvBool.Load() == false {
		watchSubResultFlow(natsClient)
	}

}

func WatchRegKV(natsClient *enums.NatsClient) {
	if IsConnected() == false {
		logger.Error("watch reg kv fail, nats not connected")
		return
	}

	if watchRegKvBool.CompareAndSwap(false, true) {
		ctxReg, cancelReg = context.WithCancel(context.Background())
		watchClientRegKV(natsClient)
		watchServerRegKV(natsClient)
		logger.Info("watch reg kv")
	}

	if watchClientRegKvBool.Load() == false {
		watchClientRegKV(natsClient)
	}

	if watchServerRegKvBool.Load() == false {
		watchServerRegKV(natsClient)
	}

}
func StopWatchRegKV() {
	if watchRegKvBool.CompareAndSwap(true, false) == false {
		return
	}
	if ctxReg != nil {
		cancelReg()
	}
}

/*
*
通知监听kv变更
场景: 断开nats; 非master节点
*/
func StopWatchKV() {
	if watchKvBool.CompareAndSwap(true, false) == false {
		return
	}

	if cancel != nil {
		cancel()
	}
	if subResultFlow != nil {
		err := subResultFlow.Unsubscribe()
		if err != nil {
			logger.Error("unsubscribe flow fail:", zap.Error(err))
		}
		watchSubResultFlowKvBool.Store(false)
	}
}

func KeyValue(bucket string) (nats.KeyValue, error) {
	js, err := natsClient.Nc.JetStream()
	if err != nil {
		logger.Error("get js fail:", zap.Error(err))
		return nil, err
	}
	kv, errkv := js.KeyValue(bucket)
	if errkv != nil {
		logger.Error("get kv fail:", zap.Error(errkv))
		return nil, errkv
	}
	return kv, nil
}

func watchSubResultFlow(natsClient *enums.NatsClient) {
	if watchSubResultFlowKvBool.Load() {
		return
	}

	js, err := natsClient.Nc.JetStream()
	if err != nil {
		logger.Error("get js fail:", zap.Error(err))
		return
	}
	sub, err := js.Subscribe(topic.JOB_SUBJ.SubResultFlow, func(msg *nats.Msg) {
		data := string(msg.Data)
		logger.Info("receive sub flow", zap.String("msg", data))
		task_service.CreateSubFlow(data)
	}, nats.Durable("natsjob-sub-result-flow-consumer")) // 使用持久化消费者
	if err != nil {
		logger.Error("subscribe flow with durable consumer fail:", zap.Error(err))
		return
	}
	subResultFlow = sub
	watchSubResultFlowKvBool.Store(true)
}

func watchJobResultsKV(natsClient *enums.NatsClient) {
	if natsClient.WatcherJobResults == nil || watchJobResultsKVBool.Load() {
		return
	}

	kv, errkv := KeyValue(topic.KV_BUCKET.JobResults)
	if errkv != nil {
		logger.Error("start watcher jobResults fail:", zap.Error(errkv))
		return
	}
	watcher, err := kv.Watch(config.EnvParam.TopicPrefix+".>",
		nats.IgnoreDeletes(), // 忽略删除操作
		//nats.MetaOnly(),      // 只获取元数据（最高效的方式）
		//nats.UpdatesOnly(), //只获取最新的变更
	)
	if err != nil {
		logger.Error("start Watcher jobResults fail:", zap.Error(err))
		return
	}
	watchJobResultsKVBool.Store(true)
	//监听
	go func() {
		logger.Info("watcher jobResults start")
		for {
			select {
			case <-ctx.Done():
				watchJobResultsKVBool.Store(false)
				if watcher != nil {
					err := watcher.Stop()
					if err != nil {
						logger.Info("watcher jobResults stop fail:", zap.Error(err))
					}
				}
				logger.Info("watcher jobResults stop")
				return
			case entry := <-watcher.Updates():
				if entry == nil {
					logger.Info("watch jobResults kv initial snapshot loaded, waiting for new changes...")
					continue
				}

				if entry.Operation() == nats.KeyValueDelete {
					logger.Info("delete key", zap.String("key", entry.Key()), zap.String("value", string(entry.Value())), zap.Uint64("revision", entry.Revision()))
				} else if entry.Operation() == nats.KeyValuePurge {
					logger.Info("purge key", zap.String("key", entry.Key()), zap.String("value", string(entry.Value())), zap.Uint64("revision", entry.Revision()))
				} else {
					natsClient.WatcherJobResults(entry)
				}
			}
		}
	}()
}

func watchClientRegKV(natsClient *enums.NatsClient) {
	if natsClient.WatcherClientReg == nil || watchClientRegKvBool.Load() {
		return
	}
	kv, errkv := KeyValue(topic.KV_BUCKET.Heartbeat)
	if errkv != nil {
		logger.Error("start watcher clientReg fail:", zap.Error(errkv))
		return
	}
	//watcher, err := kv.Watch(config.EnvParam.TopicPrefix+".>",
	watcher, err := kv.Watch(topic.KV_JOB_KEY.HeartbeatClient+".>",
		nats.IgnoreDeletes(), // 忽略删除操作
		//nats.MetaOnly(),      // 只获取元数据（最高效的方式）
		//nats.UpdatesOnly(), //只获取最新的变更
	)
	if err != nil {
		logger.Error("start watcher clientReg fail:", zap.Error(err))
		return
	}
	watchClientRegKvBool.Store(true)

	//监听
	go func() {
		for {
			select {
			case <-ctxReg.Done():
				watchClientRegKvBool.Store(false)
				if watcher != nil {
					err := watcher.Stop()
					if err != nil {
						logger.Info("watcher clientReg stop fail:", zap.Error(err))
					}
				}
				logger.Info("watcher clientReg stop")
				return
			case entry := <-watcher.Updates():
				if entry == nil {
					logger.Info("watch clientReg kv initial snapshot loaded, waiting for new changes...")
					continue
				}
				if entry.Operation() == nats.KeyValuePut {
					natsClient.WatcherClientReg(entry)
				}
			}
		}
	}()
}
func watchServerRegKV(natsClient *enums.NatsClient) {
	if natsClient.WatcherServerReg == nil || watchServerRegKvBool.Load() {
		return
	}
	kv, errkv := KeyValue(topic.KV_BUCKET.Heartbeat)
	if errkv != nil {
		logger.Error("start watcher serverReg fail:", zap.Error(errkv))
		return
	}
	watcher, err := kv.Watch(topic.KV_JOB_KEY.HeartbeatServer+".>",
		nats.IgnoreDeletes(),
	)
	if err != nil {
		logger.Error("start watcher serverReg fail:", zap.Error(err))
		return
	}
	watchServerRegKvBool.Store(true)

	//监听
	go func() {
		for {
			select {
			case <-ctxReg.Done():
				watchServerRegKvBool.Store(false)
				if watcher != nil {
					err := watcher.Stop()
					if err != nil {
						logger.Info("watcher serverReg stop fail:", zap.Error(err))
					}
				}
				logger.Info("watcher serverReg stop")
				return
			case entry := <-watcher.Updates():
				if entry == nil {
					logger.Info("watch serverReg kv initial snapshot loaded, waiting for new changes...")
					continue
				}
				if entry.Operation() == nats.KeyValuePut {
					natsClient.WatcherServerReg(entry)
				}
			}
		}
	}()
}
