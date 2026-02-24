package boot

import (
	"natsjob/internal/core/enums"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"sync/atomic"

	"github.com/robfig/cron/v3"
	"go.uber.org/zap"
)

var appJobReset = atomic.Bool{}
var isMasterValue = atomic.Bool{}

func StartServerMasterAndHeartbeat() {
	WatchRegKV(&natsClient)
	AppServerRegMap.MasterChanged = serverMasterChange
	AppServerRegMap.ResetMaster()
}

func serverMasterChange(isMaster bool) {
	logger.Info("server master change", zap.Bool("isMaster", isMaster))
	isMasterValue.Store(isMaster)
	if isMaster {
		checkJobUpdate()
		WatchKV(&natsClient)
		if !appJobReset.Load() {
			appJobReset.Store(true)
			//运行任务
			RunAppJobTask()
		}

		return
	}

	StopWatchKV()
	CronManager.Clear()
	appJobReset.Store(false)
}

// 只有master节点从其他节点更新过,如果有更新master自动更新
func checkJobUpdate() {
	checkKVKeyValue()
	entry, _ := jobUpdateKeyValue.Get(topic.JobUpdateKey())
	if entry != nil {
		RunAppJobTask()
		err := jobUpdateKeyValue.Delete(topic.JobUpdateKey())
		if err != nil {
			logger.Error("delete job update fail:", zap.Error(err))
		}
	}
}

func setJobUpdate() {
	//非主节点,触发值更新,触发主节点运行任务
	if isMasterValue.Load() == false {
		checkKVKeyValue()
		_, err := jobUpdateKeyValue.PutString(topic.JobUpdateKey(), "")
		if err != nil {
			logger.Error("set app job reset fail:", zap.Error(err))
		}

		return
	}
}

func RunAppJobTask() {
	//非主节点,触发值更新,触发主节点运行任务
	if isMasterValue.Load() == false {
		setJobUpdate()
		return
	}
	logger.Info("run app job start...")
	jobMap := map[int64]interface{}{}
	tasks := task_service.GetAppJob()
	AppJobMap.SetAppJobResetBatch(tasks)
	for _, task := range tasks {
		jobMap[task.JobId] = nil
		//追加参数
		getTask(task)
		//AppJobMap.SetAppJob(task)
		CronManager.UpdateJobByCron(task)
	}

	//循环定时任务,如果有暂停的将任务也停止
	CronManager.ResetJobTask(jobMap)

	logger.Info("run app job end...")
}

func getTask(task *enums.JobCron) {
	//追加参数
	task.EntryID = cron.EntryID(-1)
	task.JobCronCmd = CmdJobNext
	task.NatsClient = &natsClient
	task.AppClientRegMap = AppClientRegMap
}

// 增加
func RunAppJobTaskCreateUpdateById(appId int64) bool {
	if isMasterValue.Load() {
		task := task_service.GetAppJobByJobId(appId)
		if task == nil {
			logger.Error("app job is nil", zap.Int64("appId", appId))
			return false
		}
		//追加参数
		getTask(task)

		AppJobMap.SetAppJob(task)
		CronManager.UpdateJobByCron(task)
		return true
	}
	setJobUpdate()
	return true
}

// 移除
func RunAppJobTaskRemoveById(jobId int64) bool {
	if isMasterValue.Load() {
		task := task_service.GetAppJobByJobId(jobId)
		if task == nil {
			logger.Error("app job remove is nil", zap.Int64("jobId", jobId))
			return false
		}

		AppJobMap.RemoveAppJob(task)
		CronManager.RemoveJob(jobId)
		return true
	}
	setJobUpdate()
	return true
}

func GetIsMaster() bool {
	return isMasterValue.Load()
}
