package boot

import (
	"natsjob/internal/service/task_service"
	"natsjob/logger"

	"go.uber.org/zap"
)

func StartServerCronTask() {
	// 启动服务端定时任务
	serverMasterCron.Start()
	//server 发起注册
	_, err := serverMasterCron.AddFunc("@every 5s", func() {
		AppServerRegMap.ServerRegHeartbeat()
	})

	if err != nil {
		logger.Error("server reg failed", zap.Error(err))
	}

	//client 检测注册过期
	_, err = serverMasterCron.AddFunc("@every 5s", func() {
		AppClientRegMap.ResetExpired()
		AppServerRegMap.ResetExpired()
	})
	if err != nil {
		logger.Error("client reg failed", zap.Error(err))
	}

	//master重读任务;定时扫描时间后续设置为动态参数
	_, err = serverMasterCron.AddFunc("@every 30m", func() {
		if AppServerRegMap.IsMaster {
			RunAppJobTask()
		}
	})
	if err != nil {
		logger.Error("client reg failed", zap.Error(err))
	}

	//清理超过7天的结果数据
	_, err = serverMasterCron.AddFunc("@every 5m", func() {
		if AppServerRegMap.IsMaster {
			task_service.CleanExpiredResults()
			task_service.CleanExpiredSubResults()
		}
	})
	if err != nil {
		logger.Error("clean job results failed", zap.Error(err))
	}

}
