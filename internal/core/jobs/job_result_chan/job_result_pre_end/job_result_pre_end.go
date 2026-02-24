package job_result_pre_end

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/appjob"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"natsjob/internal/core/jobs/scheduler/job_map"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"natsjob/pkg/json"
	"natsjob/pkg/strutil"
	"time"

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

	if jobResultEndInfo.IsSuccessNext || jobResultEndInfo.IsSuccess || jobResultEndInfo.IsFail {
		jobResultSuccessFail(task, &jobResultEndInfo)
	}
}

func jobResultSuccessFail(task Task, jobResultEndInfo *job_result_service.JobResultEndInfo) {
	entry := task.Entry
	jobPreEndKey := entry.Key()

	logger.Info("jobResults kv preEnd",
		zap.String("jobPreEndKey", entry.Key()),
		zap.Uint64("revision", entry.Revision()),
		zap.String("value", jobResultEndInfo.Status),
		zap.Time("created", entry.Created()),
	)

	//删除jobEndKey
	jobResultsKeyValue := task.JobResultsKeyValue
	err := jobResultsKeyValue.Delete(jobPreEndKey)
	if err != nil {
		logger.Error("jobResults kv preEnd delete jobPreEndKey fail",
			zap.String("jobPreEndKey", entry.Key()),
			zap.Uint64("revision", entry.Revision()),
			zap.String("value", jobResultEndInfo.Status),
			zap.Time("created", entry.Created()),
			zap.Error(err),
		)
	}

	//只有成功才会继续下一步处理
	if jobResultEndInfo.IsSuccessNext {
		successNext(task, jobPreEndKey)
		return
	}

	//成功或失败就代表彻底结束,尽可能让客户端自己控制下一步的交互
	if jobResultEndInfo.IsSuccess || jobResultEndInfo.IsFail {
		successOrFail(task, jobPreEndKey, jobResultEndInfo)
	}
}

func successOrFail(task Task, jobPreEndKey string, jobResultEndInfo *job_result_service.JobResultEndInfo) {
	//读取jobKey进行下一步执行操作
	jobKeyKeyValue := task.JobKeyKeyValue
	jobKey := topic.JobKeyByPreEndKey(jobPreEndKey)

	//读取任务
	jobKeyEntry, _ := jobKeyKeyValue.Get(jobKey)
	//更新任务状态
	var jobMessage *enums.JobMessage
	err := json.Unmarshal(jobKeyEntry.Value(), &jobMessage)
	if err != nil {
		logger.Error("jobKey kv get jobKey cron fail", zap.String("jobKey", jobKey), zap.Error(err))
	}

	appJobResultInfo := enums.AppJobResultInfo{
		ID:             topic.TaskIntIdByKey(jobPreEndKey),
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

	//删除缓存
	cache.Del(jobKey)
	//删除jobKey
	err = jobKeyKeyValue.Delete(jobKey)
	if err != nil {
		logger.Error("jobKey kv del jobKey fail",
			zap.String("jobKey", jobKey),
			zap.Error(err),
		)
	}
}

func successNext(task Task, jobPreEndKey string) {
	//读取jobKey进行下一步执行操作
	jobKeyKeyValue := task.JobKeyKeyValue
	jobKey := topic.JobKeyByPreEndKey(jobPreEndKey)
	jobKeyEntry, err := jobKeyKeyValue.Get(jobKey)
	if err != nil {
		logger.Error("jobKey kv get jobKey fail",
			zap.String("jobKey", jobKey),
			zap.Error(err),
		)
		return
	}

	var jobMessage enums.JobMessage
	err = json.Unmarshal(jobKeyEntry.Value(), &jobMessage)
	if err != nil {
		logger.Error("jobKey kv get jobKey cron fail",
			zap.String("jobKey", jobKey),
			zap.Error(err),
		)
		return
	}

	jobCron, b := task.AppJobMap.GetAppJob(jobMessage.JobPubMessage.Namespace, jobMessage.JobPubMessage.AppName, jobMessage.JobPubMessage.JobName)
	if !b {
		logger.Error("jobKey kv get jobKey cron fail, job not found",
			zap.String("jobKey", jobKey),
			zap.String("appName", jobMessage.JobPubMessage.AppName),
			zap.String("jobName", jobMessage.JobPubMessage.JobName),
		)
		return
	}

	//尝试加入缓存;可能是历史数据的扫描,但是不执行下一步逻辑,防止重复下发任务
	if !cache.Has(jobKey) {
		subDuration := time.Now().Sub(jobKeyEntry.Created())
		if subDuration.Seconds() <= 0 {
			subDuration = time.Duration(1) * time.Second
		}
		cache.Set(jobKey, jobPreEndKey, subDuration)
		return
	}

	//map发布下一个任务
	if enums.JobCategories.Map.Type == jobCron.JobCategory {
		taskId := topic.TaskIdByKey(jobPreEndKey)
		taskIdInt, _ := strutil.ToInt64(taskId)
		job_map.PubNext(jobCron, taskIdInt)
	}

}
