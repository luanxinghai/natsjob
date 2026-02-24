package job_result_client_end

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/appjob"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"natsjob/pkg/strutil"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

var tasks = make(chan Task, 10000)
var semaphore chan struct{}

type Task struct {
	AppJobMap          *appjob.AppJobManager
	Entry              nats.KeyValueEntry
	JobKeyKeyValue     nats.KeyValue
	JobResultsKeyValue nats.KeyValue
}

func InitSemaphore(DBChanSemaphore chan struct{}) {
	semaphore = DBChanSemaphore
}
func init() {
	go runChain()
}

func SetTask(task Task) {
	tasks <- task
}

func runChain() {
	for {
		select {
		case task, _ := <-tasks:
			semaphore <- struct{}{}
			go func() {
				defer func() {
					<-semaphore
				}()
				runJobResult(task)
			}()
		}
	}
}

func runJobResult(task Task) {
	entry := task.Entry
	value := string(entry.Value())
	//任务结束处理
	jobResultEndInfo := job_result_service.GetJobResultEndInfo(value)

	if jobResultEndInfo.IsSuccess || jobResultEndInfo.IsFail {
		entry := task.Entry
		jobClientEndKey := entry.Key()
		JobResultSuccessFail(jobClientEndKey, task.JobKeyKeyValue, task.JobResultsKeyValue, &jobResultEndInfo)
	}
}

func JobResultSuccessFail(jobClientEndKey string, jobKeyKeyValue nats.KeyValue, jobResultsKeyValue nats.KeyValue, jobResultEndInfo *job_result_service.JobResultEndInfo) {
	//移除下发任务
	jobKey := topic.JobKeyByClientEndKey(jobClientEndKey)
	jobKeyEntry, _ := jobKeyKeyValue.Get(jobKey)

	//更新任务状态
	var jobMessage = job_result_service.GetJobMessage(jobKeyEntry)
	appJobResultInfo := enums.AppJobResultInfo{
		ID:             topic.TaskIntIdByKey(jobClientEndKey),
		Status:         jobResultEndInfo.Status,
		Reason:         jobResultEndInfo.Reason,
		MonitorStatus:  jobResultEndInfo.MonitorStatus,
		MonitorPayload: jobResultEndInfo.MonitorPayload,
		CreateAt:       jobMessage.JobPubMessage.JobCreatedAt,
		Namespace:      jobMessage.JobPubMessage.Namespace,
		AppName:        jobMessage.JobPubMessage.AppName,
		JobName:        jobMessage.JobPubMessage.JobName,
	}

	//子任务结果处理
	jobKeySubKey := topic.JobKeyByClientEndSubKey(jobClientEndKey)
	task_service.UpdateSubJob(&appJobResultInfo, strutil.ToInt64OrZero(jobKeySubKey))
	logger.Info("jobResults kv clientEnd",
		zap.String("jobKey", jobKey),
		zap.String("jobKeySubKey", jobKeySubKey),
	)

	//是否删除jobKey需要判断是否还有没有其他客户端
	cache.DelSub(jobKey, jobClientEndKey)
	logger.Info("jobResults kv clientEnd, del sub key",
		zap.String("jobKey", jobKey),
		zap.String("jobClientEndKey", jobClientEndKey),
	)

	count := cache.CountSub(jobKey)
	if count > 0 {
		//删除jobEndKey,场景1
		job_result_service.RemoveJobEndKey(jobResultsKeyValue, jobClientEndKey)

		logger.Info("jobResults has other clients,next delete jobKey",
			zap.String("jobKey", jobKey),
			zap.Int("count", count),
			zap.String("jobClientEndKeyHasDeleted", jobClientEndKey),
		)
		return
	}

	//更新任务结果
	task_service.UpdateJob(&appJobResultInfo)

	//删除缓存
	cache.Del(jobKey)
	err := jobKeyKeyValue.Delete(jobKey)
	if err != nil {
		logger.Error("jobKey kv del jobKey fail",
			zap.String("jobKey", jobKey),
			zap.Error(err),
		)
	}
	//删除jobEndKey,场景2
	job_result_service.RemoveJobEndKey(jobResultsKeyValue, jobClientEndKey)
}
