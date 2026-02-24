package boot

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/jobs/job_result_chan/job_result_check"
	"natsjob/internal/core/jobs/job_result_chan/job_result_client_check"
	"natsjob/internal/core/jobs/job_result_chan/job_result_client_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_pre_check"
	"natsjob/internal/core/jobs/job_result_chan/job_result_pre_end"
	"natsjob/internal/core/topic"
	"natsjob/logger"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

var jobKeyKeyValue nats.KeyValue
var jobResultsKeyValue nats.KeyValue
var jobHeartbeatKeyValue nats.KeyValue
var jobUpdateKeyValue nats.KeyValue

func checkKVKeyValue() {
	if jobKeyKeyValue == nil {
		jobKeyKeyValue, _ = natsClientKeyValue(&natsClient, topic.KV_BUCKET.JobKeys)
	}
	if jobResultsKeyValue == nil {
		jobResultsKeyValue, _ = natsClientKeyValue(&natsClient, topic.KV_BUCKET.JobResults)
	}
	if jobHeartbeatKeyValue == nil {
		jobHeartbeatKeyValue, _ = natsClientKeyValue(&natsClient, topic.KV_BUCKET.Heartbeat)
	}
	if jobUpdateKeyValue == nil {
		jobUpdateKeyValue, _ = natsClientKeyValue(&natsClient, topic.KV_BUCKET.JobUpdate)
	}
}

func watchJobResults(entry nats.KeyValueEntry) {
	checkKVKeyValue()

	jobEndKey := entry.Key()
	value := string(entry.Value())
	revision := entry.Revision()
	logger.Info("jobResults kv update",
		zap.String("jobEndKey", jobEndKey),
		zap.Uint64("revision", revision),
		zap.String("value", value),
		zap.Time("created", entry.Created()),
	)

	//通用任务结束
	if topic.IsJobEndPrefix(jobEndKey) {
		//在缓存内,说明新创建的任务
		jobKey := topic.JobKeyByEndKey(jobEndKey)
		if value == "" && cache.Has(jobKey) {
			return
		}

		//检测任务,如果不在缓存里,说明程序重启了,最大程度尝试恢复处理
		if value == "" && !cache.Has(jobKey) {
			logger.Info("task not found, try to recover", zap.String("jobKey", jobKey))
			job_result_check.SetTask(job_result_check.Task{
				Entry:              entry,
				JobResultsKeyValue: jobResultsKeyValue,
				JobKeyKeyValue:     jobKeyKeyValue,
			})
			return
		}

		//处理结果chan
		if value != "" {
			job_result_end.SetTask(job_result_end.Task{
				AppJobMap:          AppJobMap,
				Entry:              entry,
				JobResultsKeyValue: jobResultsKeyValue,
				JobKeyKeyValue:     jobKeyKeyValue,
			})
		}
		return
	}

	//前置任务结束
	if topic.IsJobPreEndPrefix(jobEndKey) {
		//在缓存内,说明新创建的任务
		jobKey := topic.JobKeyByPreEndKey(jobEndKey)
		if value == "" && cache.Has(jobKey) {
			return
		}

		//检测任务,如果不在缓存里,说明程序重启了,最大程度尝试恢复处理
		if value == "" && !cache.Has(jobKey) {
			logger.Info("pre-end task not found, try to recover", zap.String("jobKey", jobKey))
			job_result_pre_check.SetTask(job_result_pre_check.Task{
				Entry:              entry,
				JobResultsKeyValue: jobResultsKeyValue,
				JobKeyKeyValue:     jobKeyKeyValue,
			})
			return
		}
		//处理结果chan
		job_result_pre_end.SetTask(job_result_pre_end.Task{
			AppJobMap:          AppJobMap,
			Entry:              entry,
			JobResultsKeyValue: jobResultsKeyValue,
			JobKeyKeyValue:     jobKeyKeyValue,
		})
	}

	//客户端任务结束
	if topic.IsJobClientEndPrefix(jobEndKey) {
		//在缓存内,说明新创建的任务
		jobKey := topic.JobKeyByClientEndKey(jobEndKey)
		if value == "" && cache.Has(jobKey) {
			return
		}

		//检测任务,如果不在缓存里,说明程序重启了,最大程度尝试恢复处理
		if value == "" && !cache.Has(jobKey) {
			logger.Info("client task not found, try to recover", zap.String("jobKey", jobKey))
			job_result_client_check.SetTask(job_result_client_check.Task{
				Entry:              entry,
				JobResultsKeyValue: jobResultsKeyValue,
				JobKeyKeyValue:     jobKeyKeyValue,
			})
			return
		}
		//处理结果chan
		job_result_client_end.SetTask(job_result_client_end.Task{
			AppJobMap:          AppJobMap,
			Entry:              entry,
			JobResultsKeyValue: jobResultsKeyValue,
			JobKeyKeyValue:     jobKeyKeyValue,
		})
	}

}
