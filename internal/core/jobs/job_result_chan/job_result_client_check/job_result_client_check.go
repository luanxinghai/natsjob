package job_result_client_check

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/json"
	"time"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

var tasks = make(chan Task, 10000)

type Task struct {
	Entry              nats.KeyValueEntry
	JobKeyKeyValue     nats.KeyValue
	JobResultsKeyValue nats.KeyValue
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
			runJobResult(task)
		}
	}
}

func runJobResult(task Task) {
	jobKeyKeyValue := task.JobKeyKeyValue
	jobResultsKeyValue := task.JobResultsKeyValue
	entry := task.Entry

	jobEndKey := entry.Key()
	jobKey := topic.JobKeyByClientEndKey(jobEndKey)

	jobKeyKV, err := jobKeyKeyValue.Get(jobKey)
	if err != nil {
		logger.Error("client get jobKey fail",
			zap.String("jobKey", jobKey),
			zap.String("jobEndKey", jobEndKey),
			zap.Error(err),
		)
		//如果找不到jobKey,说明任务已经过期,直接删除结果
		job_result_service.RemoveJobEndKey(jobResultsKeyValue, jobEndKey)
		return
	}

	jobMessage := enums.JobMessage{}
	err = json.Unmarshal(jobKeyKV.Value(), &jobMessage)
	if err != nil {
		logger.Error("client unmarshal jobKey fail",
			zap.String("jobKey", jobKey),
			zap.String("jobEndKey", jobEndKey),
			zap.Error(err),
		)
	}

	JobExpireTime := jobMessage.JobPubMessage.JobExpireTime
	if JobExpireTime == "" {
		job_result_service.RemoveJobKey(jobKeyKeyValue, jobKey)
		return
	}
	//计算与当前时间秒数差
	dateTime := datetime.ParseDateTimeOrNil(JobExpireTime)
	if dateTime == nil {
		timeNow := time.Now()
		dateTime = &timeNow
	}
	subDuration := dateTime.Sub(time.Now())
	if subDuration.Seconds() <= 0 {
		subDuration = time.Duration(1) * time.Second
	}
	cache.SetSub(jobKey, jobEndKey, jobMessage.JobPubMessage.JobCreatedAt, subDuration)
	logger.Info("client jobResults kv  test history add cache",
		zap.Any("subDuration", subDuration),
		zap.String("jobKey", jobKey),
		zap.String("jobEndKey", jobEndKey),
		zap.Any("jobMessage", jobMessage),
	)
}
