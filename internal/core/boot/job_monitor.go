package boot

import (
	"natsjob/global"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"natsjob/pkg/json"

	"go.uber.org/zap"
)

func JobMonitor(appJobMonitorInfo *enums.AppJobMonitorInfo) {
	if appJobMonitorInfo == nil {
		return
	}

	//增加容错处理
	if appJobMonitorInfo.Namespace == "" {
		appJobMonitorInfo.Namespace = global.Namespace
	}

	if appJobMonitorInfo.AppName == "" {
		appJobMonitorInfo.AppName = global.AppName
	}

	//发给指定命名空间的订阅者
	monitorSubj := topic.MonitorSubKey(appJobMonitorInfo.Namespace, appJobMonitorInfo.AppName)
	err := natsClient.Nc.Publish(monitorSubj, []byte(json.MustMarshal(appJobMonitorInfo)))
	if err != nil {
		logger.Error("jobMonitor", zap.String("subj", monitorSubj), zap.Any("appJobMonitorInfo", appJobMonitorInfo), zap.Error(err))
		return
	}
	logger.Info("jobMonitor", zap.String("subj", monitorSubj), zap.Any("appJobMonitorInfo", appJobMonitorInfo))
}
