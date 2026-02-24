package schedule_service

import (
	"natsjob/internal/core/enums"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"natsjob/pkg/json"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func KeyValue(natsclient *enums.NatsClient, bucket string) (nats.KeyValue, error) {
	js, _ := natsclient.Nc.JetStream()
	return js.KeyValue(bucket)
}

func SetJobKeyResultKV(natsclient *enums.NatsClient, message *enums.JobMessage) {
	//设置开始任务key
	jobKeysKV, err := KeyValue(natsclient, topic.KV_BUCKET.JobKeys)
	if err != nil {
		logger.Error("get kv failed", zap.String("bucket", topic.KV_BUCKET.JobKeys), zap.Error(err))
		return
	}

	_, err = jobKeysKV.PutString(message.JobKeyKvKey, json.MustMarshal(message))
	if err != nil {
		logger.Error("set kv failed", zap.String("jobKey", message.JobKeyKvKey), zap.Error(err))
	}

	//设置结束任务key
	SetJobResultKV(natsclient, message)
}

func SetJobResultKV(natsclient *enums.NatsClient, message *enums.JobMessage) {
	//设置结束任务key
	jobEndKV, err := KeyValue(natsclient, topic.KV_BUCKET.JobResults)
	if err != nil {
		logger.Error("get kv failed", zap.String("bucket", topic.KV_BUCKET.JobResults), zap.Error(err))
		return
	}
	_, err = jobEndKV.PutString(message.JobPubMessage.JobEndKvKey, "")
	if err != nil {
		logger.Error("set kv failed", zap.String("jobEndKey", message.JobPubMessage.JobEndKvKey), zap.Error(err))
	}
}

func Publish(natsclient *enums.NatsClient, subj string, data *enums.JobPubMessage) {
	//if natsclient.Connected.Load() == false {
	//	logger.Error("job publish message skip, nats not connected", zap.String("subject", subj))
	//	return
	//}
	msg := json.MustMarshal(data)
	err := natsclient.Nc.Publish(subj, []byte(msg))
	if err != nil {
		logger.Error("job publish message failed",
			zap.String("subject", subj),
			zap.String("namespace", data.Namespace),
			zap.String("appName", data.AppName),
			zap.String("jobName", data.JobName),
			zap.Any("message", data),
			zap.Error(err),
		)
		return
	}

	logger.Info("job published",
		zap.String("subj", subj),
		zap.String("namespace", data.Namespace),
		zap.String("appName", data.AppName),
		zap.String("jobName", data.JobName),
		zap.Any("message", data),
	)
}
