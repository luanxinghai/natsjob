package job_result_service

import (
	"natsjob/internal/core/enums"
	"natsjob/logger"
	"natsjob/pkg/json"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func GetJobMessage(jobKeyEntry nats.KeyValueEntry) *enums.JobMessage {
	if jobKeyEntry == nil {
		return &enums.JobMessage{}
	}

	//更新任务状态
	var jobMessage *enums.JobMessage
	err := json.Unmarshal(jobKeyEntry.Value(), &jobMessage)
	if err != nil {
		logger.Error("jobKey kv get jobKey cron fail", zap.String("jobKey", jobKeyEntry.Key()), zap.Error(err))
	}
	return jobMessage
}

func RemoveJobEndKey(jobResultsKeyValue nats.KeyValue, jobEndKey string) {
	if jobEndKey == "" {
		return
	}
	err := jobResultsKeyValue.Delete(jobEndKey)
	if err != nil {
		logger.Error("jobResults kv delete jobEndKey fail",
			zap.String("jobEndKey", jobEndKey),
			zap.Error(err),
		)
	}
}

func RemoveJobKey(jobKeyValue nats.KeyValue, jobKey string) {
	err := jobKeyValue.Delete(jobKey)
	if err != nil {
		logger.Error("jobKey kv delete jobKey fail",
			zap.String("jobKey", jobKey),
			zap.Error(err),
		)
	}
}
