package boot

import (
	"natsjob/internal/core/topic"
	"natsjob/logger"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func watchJobKeys(entry nats.KeyValueEntry) {
	checkKVKeyValue()

	jobKey := entry.Key()
	value := string(entry.Value())
	revision := entry.Revision()

	jobEndKey := topic.JobEndKeyByKey(jobKey)
	//jobKeyCacheExpire(jobKey, jobEndKey)
	logger.Info("jobKey kv update",
		zap.String("jobKey", jobKey),
		zap.String("jobEndKey", jobEndKey),
		zap.Uint64("revision", revision),
		zap.String("value", value),
		zap.Time("Created", entry.Created()),
	)
}
