package job_standalone

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/scheduler/schedule_service"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/strutil"
	"time"

	"go.uber.org/zap"
)

func PubNext(job *enums.JobCron) {
	switch job.JobModel {
	case enums.JobModels.Lite.Type:
		liteJob(job)
	case enums.JobModels.Plus.Type:
		plusJob(job)
	case enums.JobModels.Max.Type:
		maxJob(job)
	case enums.JobModels.Pro.Type:
		proJob(job)
	case enums.JobModels.Ultra.Type:
		ultraJob(job)
	}
}

func getJobMessage(job *enums.JobCron, endKvKey bool) enums.JobMessage {
	taskId := ids.Id()
	now := time.Now()

	// 设置任务到期时间
	jobExpireTime := ""
	jobEndKvKey := ""
	JobEndResultKvBucket := ""
	if endKvKey {
		jobEndKvKey = topic.JobEndKey(job, taskId)
		JobEndResultKvBucket = topic.KV_BUCKET.JobResults
		if job.TimeoutSeconds > 0 {
			add := now.Add(time.Duration(job.TimeoutSeconds) * time.Second)
			jobExpireTime = datetime.DateTimeMs(add)
		}
	}

	return enums.JobMessage{
		TaskId:      taskId,
		JobId:       job.JobId,
		JobKeyKvKey: topic.JobKey(job, taskId),
		JobPubMessage: enums.JobPubMessage{
			TaskId:               strutil.ToStr(taskId),
			Namespace:            job.Namespace,
			AppName:              job.AppName,
			JobName:              job.JobName,
			JobCategory:          job.JobCategory,
			JobModel:             job.JobModel,
			JobArgs:              job.JobArgs,
			JobCreatedAt:         datetime.DateTimeMs(now),
			JobExpireTime:        jobExpireTime,
			JobEndKvKey:          jobEndKvKey,
			JobEndResultKvBucket: JobEndResultKvBucket,
		},
	}
}

func liteJob(job *enums.JobCron) {
	message := getJobMessage(job, false)
	schedule_service.Publish(job.NatsClient, topic.JobVoidStartSubj(job), &message.JobPubMessage)
}

func plusJob(job *enums.JobCron) {
	message := getJobMessage(job, false)
	schedule_service.Publish(job.NatsClient, topic.JobStartSubj(job), &message.JobPubMessage)
}

func maxJob(job *enums.JobCron) {
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessage(job, true, count)
}

func proJob(job *enums.JobCron) {
	if !schedule_service.CheckAppOnline(job) {
		return
	}
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessage(job, true, count)
}

func ultraJob(job *enums.JobCron) {
	if !schedule_service.CheckAppOnline(job) {
		return
	}
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessageByClient(job, true, count)
}

func publishMessage(job *enums.JobCron, endKvKey bool, count int) {
	message := getJobMessage(job, endKvKey)
	message.JobPubMessage.JobRunningCount = count

	//写库
	task_service.CreateJob(job, &message)
	//增加缓存过期超时回调;暂时不在这里增加,统一由监听key变更来增加超时
	cache.Set(message.JobKeyKvKey, message.JobPubMessage.JobEndKvKey, time.Duration(job.TimeoutSeconds)*time.Second)
	//将任务加入kv中
	schedule_service.SetJobKeyResultKV(job.NatsClient, &message)
	//发送消息
	jobStartTopic := topic.JobStartSubj(job)
	schedule_service.Publish(job.NatsClient, jobStartTopic, &message.JobPubMessage)
}

func publishMessageByClient(job *enums.JobCron, endKvKey bool, count int) {
	message := getJobMessage(job, endKvKey)
	message.JobPubMessage.JobRunningCount = count
	message.JobPubMessage.Condition = job.Condition

	//客户端获取规则,默认轮询
	var clientId string
	if job.Condition == enums.JOB_CONDITION.ClientFirst {
		clientId = schedule_service.GetAppOnlineClientStartTimeFirst(job)
	} else if job.Condition == enums.JOB_CONDITION.ClientRandom {
		clientId = schedule_service.GetAppOnlineClientRandom(job)
	} else if job.Condition == enums.JOB_CONDITION.ClientMaxWeight {
		clientId = schedule_service.GetAppOnlineClientMaxWeight(job)
	} else {
		clientId = schedule_service.GetAppOnlineClientRound(job)
	}

	if clientId == "" {
		logger.Error("no online client", zap.Any("message", message))
		return
	}
	clientIdKey := ids.Id()
	endKey := topic.JobClientEndKey(job, message.TaskId, clientIdKey)
	message.JobPubMessage.JobEndKvKey = endKey

	task_service.CreateJob(job, &message)
	cache.Set(message.JobKeyKvKey, endKey, time.Duration(job.TimeoutSeconds)*time.Second)

	//写库
	task_service.CreateJobSub(job, &message, clientIdKey, clientId)
	//加入缓存
	cache.SetSub(message.JobKeyKvKey, endKey, message.JobPubMessage.JobCreatedAt, time.Duration(job.TimeoutSeconds)*time.Second)

	//将任务加入kv中
	schedule_service.SetJobKeyResultKV(job.NatsClient, &message)

	//发送消息
	jobStartTopic := topic.JobClientStartSubj(job, clientId)
	schedule_service.Publish(job.NatsClient, jobStartTopic, &message.JobPubMessage)
}
