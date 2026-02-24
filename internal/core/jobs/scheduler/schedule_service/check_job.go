package schedule_service

import (
	"math/rand"
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/register/client_reg"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"sort"
	"time"

	"go.uber.org/zap"
)

// 检查任务并发数
func CheckJobRunningCount(job *enums.JobCron) (bool, int) {
	appJobName := topic.AppJobByCron(job)
	count := cache.Count(appJobName)

	if count+1 > job.MaxWorkers {
		//任务正在执行数量大于最大并发数,则不发布任务
		logger.Info("job running count +1 > maxWorkers",
			zap.Int("count", count),
			zap.Int("maxWorkers", job.MaxWorkers),
			zap.String("namespace", job.Namespace),
			zap.String("appName", job.AppName),
			zap.String("jobName", job.JobName))
		return false, count
	}

	logger.Info("job running count",
		zap.Int("count", count),
		zap.Int("maxWorkers", job.MaxWorkers),
		zap.String("namespace", job.Namespace),
		zap.String("appName", job.AppName),
		zap.String("jobName", job.JobName))

	return true, count
}

// 检查app是否在线
func CheckAppOnline(job *enums.JobCron) bool {
	clientCount := job.AppClientRegMap.ClientRegCount(job.Namespace, job.AppName)
	if clientCount == 0 {
		//没有客户端注册,则不发布任务
		logger.Error("no client reg, skip pub job",
			zap.String("namespace", job.Namespace),
			zap.String("appName", job.AppName),
			zap.String("jobName", job.JobName),
			zap.String("jobCategory", job.JobCategory),
			zap.String("JobModel", job.JobModel),
		)
		return false
	}
	return true
}

// 获取全部客户端id
func GetAppOnlineClient(job *enums.JobCron) []string {
	appClientRegMap := job.AppClientRegMap.GetClientReg(job.Namespace, job.AppName)
	if appClientRegMap == nil {
		return []string{}
	}
	clientIds := appClientRegMap.Keys()
	if len(clientIds) == 0 {
		return []string{}
	}
	return clientIds
}

// 第一个
func GetAppOnlineClientFirst(job *enums.JobCron) string {
	appClientRegMap := job.AppClientRegMap.GetClientReg(job.Namespace, job.AppName)
	if appClientRegMap == nil {
		return ""
	}
	clientIds := appClientRegMap.Keys()
	if len(clientIds) == 0 {
		return ""
	}
	return clientIds[0]
}

// 随机
func GetAppOnlineClientRandom(job *enums.JobCron) string {
	appClientRegMap := job.AppClientRegMap.GetClientReg(job.Namespace, job.AppName)
	if appClientRegMap == nil {
		return ""
	}
	clientIds := appClientRegMap.Keys()
	if len(clientIds) == 0 {
		return ""
	}

	if len(clientIds) == 1 {
		return clientIds[0]
	}

	return clientIds[rand.Intn(len(clientIds))]
}

// 优先注册
func GetAppOnlineClientStartTimeFirst(job *enums.JobCron) string {
	appClientRegMap := job.AppClientRegMap.GetClientReg(job.Namespace, job.AppName)
	if appClientRegMap == nil {
		return ""
	}
	clientIds := appClientRegMap.Keys()
	if len(clientIds) == 0 {
		return ""
	}

	if len(clientIds) == 1 {
		return clientIds[0]
	}

	timeNow := time.Now()
	clientId := ""
	appClientRegMap.IterCb(func(clientID string, reg *client_reg.ClientReg) {
		if reg.StartTime.Before(timeNow) {
			timeNow = reg.StartTime
			clientId = clientID
		}
	})

	return clientId
}

// 轮询
func GetAppOnlineClientRound(job *enums.JobCron) string {
	appClientRegMap := job.AppClientRegMap.GetClientReg(job.Namespace, job.AppName)
	if appClientRegMap == nil {
		return ""
	}
	clientIds := appClientRegMap.Keys()
	if len(clientIds) == 0 {
		return ""
	}

	if len(clientIds) == 1 {
		return clientIds[0]
	}
	//客户端id排序
	sort.Strings(clientIds)
	// 上次客户端id
	if job.LastClientId != "" {
		for i := range clientIds {
			if clientIds[i] == job.LastClientId {
				job.LastClientId = clientIds[(i+1)%len(clientIds)]
				return job.LastClientId
			}
		}
	}

	job.LastClientId = clientIds[0]
	return job.LastClientId
}

// 最大权重
func GetAppOnlineClientMaxWeight(job *enums.JobCron) string {
	return job.AppClientRegMap.GetClientRegMaxWeight(job.Namespace, job.AppName)
}
