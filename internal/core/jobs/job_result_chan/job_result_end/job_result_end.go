package job_result_end

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/appjob"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"natsjob/pkg/json"

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

	jobResultEndInfo := job_result_service.GetJobResultEndInfo(value)

	if jobResultEndInfo.IsSuccess || jobResultEndInfo.IsFail {
		entry := task.Entry
		jobClientEndKey := entry.Key()
		JobResultSuccessFail(jobClientEndKey, task.JobKeyKeyValue, task.JobResultsKeyValue, &jobResultEndInfo)
	}
}

func JobResultSuccessFail(jobEndKey string, jobKeyKeyValue nats.KeyValue, jobResultsKeyValue nats.KeyValue, jobResultEndInfo *job_result_service.JobResultEndInfo) {
	jobKey := ""
	if topic.IsJobPreEndPrefix(jobEndKey) {
		jobKey = topic.JobKeyByPreEndKey(jobEndKey)
	} else {
		jobKey = topic.JobKeyByEndKey(jobEndKey)
	}

	//移除下发任务
	jobKeyEntry, _ := jobKeyKeyValue.Get(jobKey)

	//更新任务状态
	if jobKeyEntry == nil {
		return
	}
	var jobMessage *enums.JobMessage
	err := json.Unmarshal(jobKeyEntry.Value(), &jobMessage)
	if err != nil {
		logger.Error("jobKey kv get jobKey cron fail", zap.String("jobKey", jobKey), zap.Error(err))
	}

	appJobResultInfo := enums.AppJobResultInfo{
		ID:             topic.TaskIntIdByKey(jobEndKey),
		Status:         jobResultEndInfo.Status,
		Reason:         jobResultEndInfo.Reason,
		MonitorStatus:  jobResultEndInfo.MonitorStatus,
		MonitorPayload: jobResultEndInfo.MonitorPayload,
		CreateAt:       jobMessage.JobPubMessage.JobCreatedAt,
		Namespace:      jobMessage.JobPubMessage.Namespace,
		AppName:        jobMessage.JobPubMessage.AppName,
		JobName:        jobMessage.JobPubMessage.JobName,
	}
	task_service.UpdateJob(&appJobResultInfo)

	//删除定时任务检测
	cache.Del(jobKey)

	//删除任务id
	job_result_service.RemoveJobKey(jobKeyKeyValue, jobKey)
	//移除结果
	job_result_service.RemoveJobEndKey(jobResultsKeyValue, jobEndKey)
}
