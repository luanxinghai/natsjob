package boot

import (
	"natsjob/internal/core/jobs/job_result_chan/job_expired"
	"natsjob/logger"
	"strconv"
	"time"

	"github.com/jellydator/ttlcache/v3"
	"go.uber.org/zap"
)

func OnEviction(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string]) {
	if reason == ttlcache.EvictionReasonExpired {
		checkKVKeyValue()

		logger.Info("cache OnEviction",
			zap.String("jobKey", item.Key()),
			zap.String("jobEndKey", item.Value()),
			zap.String("reason", strconv.Itoa(int(reason))))

		job_expired.SetTask(job_expired.Task{
			Item:               item,
			JobResultsKeyValue: jobResultsKeyValue,
			JobKeyKeyValue:     jobKeyKeyValue,
			ExpireEndTime:      time.Now(),
		})
	}
}

func OnEvictionSub(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string]) {
	if reason == ttlcache.EvictionReasonExpired {

		logger.Info("cache OnEviction Sub",
			zap.String("key", item.Key()),
			zap.String("value", item.Value()),
			zap.String("reason", strconv.Itoa(int(reason))))

		job_expired.SetTaskSub(job_expired.Task{
			Item:               item,
			JobResultsKeyValue: jobResultsKeyValue,
			JobKeyKeyValue:     jobKeyKeyValue,
			ExpireEndTime:      time.Now(),
		})
	}
}
