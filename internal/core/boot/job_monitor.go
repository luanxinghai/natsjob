package boot

import (
	"natsjob/internal/core/enums"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"natsjob/pkg/json"

	"go.uber.org/zap"
)

func JobMonitor(appJobMonitorInfo *enums.AppJobMonitorInfo) {
	err := natsClient.Nc.Publish(topic.JOB_SUBJ.Monitor, []byte(json.MustMarshal(appJobMonitorInfo)))
	if err != nil {
		logger.Error("JobMonitor", zap.Any("appJobMonitorInfo", appJobMonitorInfo), zap.Error(err))
		return
	}
	logger.Info("JobMonitor", zap.Any("appJobMonitorInfo", appJobMonitorInfo))
}
