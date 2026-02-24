package job_map

import (
	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/scheduler/schedule_service"
	"natsjob/internal/core/topic"
	"natsjob/internal/service/task_service"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/strutil"
	"time"
)

// 前置任务
func PubNextPre(job *enums.JobCron) {
	switch job.JobModel {
	case enums.JobModels.Lite.Type:
		liteJobPre(job)
	case enums.JobModels.Plus.Type:
		plusJobPre(job)
	case enums.JobModels.Max.Type:
		maxJobPre(job)
	case enums.JobModels.Pro.Type:
		proJobPre(job)
	case enums.JobModels.Ultra.Type:
		ultraJobPre(job)
	}
}

// 下一个任务
func PubNext(job *enums.JobCron, taskId int64) {
	switch job.JobModel {
	case enums.JobModels.Max.Type:
		maxJob(job, taskId)
	case enums.JobModels.Pro.Type:
		proJob(job, taskId)
	case enums.JobModels.Ultra.Type:
		ultraJob(job, taskId)
	}
}
func getJobMessagePre(job *enums.JobCron, endKvKey bool) enums.JobMessage {
	return getJobMessageBase(job, ids.Id(), endKvKey, true)
}
func getJobMessage(job *enums.JobCron, taskId int64, endKvKey bool) enums.JobMessage {
	return getJobMessageBase(job, taskId, endKvKey, false)
}
func getJobMessageBase(job *enums.JobCron, taskId int64, endKvKey bool, isPreKey bool) enums.JobMessage {
	now := time.Now()

	// 设置任务到期时间
	jobExpireTime := ""
	jobEndKvKey := ""
	JobEndResultKvBucket := ""
	if endKvKey {
		if isPreKey {
			jobEndKvKey = topic.JobPreEndKey(job, taskId)
		} else {
			jobEndKvKey = topic.JobEndKey(job, taskId)
		}
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
			//JobRunningCount:      job.JobMap.Count(),
		},
	}
}

func liteJobPre(job *enums.JobCron) {
	message := getJobMessagePre(job, false)
	schedule_service.Publish(job.NatsClient, topic.JobVoidPreStartSubj(job), &message.JobPubMessage)
}

func plusJobPre(job *enums.JobCron) {
	message := getJobMessagePre(job, false)
	schedule_service.Publish(job.NatsClient, topic.JobPreStartSubj(job), &message.JobPubMessage)
}

func maxJobPre(job *enums.JobCron) {
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessagePre(job, true, count)
}

func maxJob(job *enums.JobCron, taskId int64) {
	_, count := schedule_service.CheckJobRunningCount(job)
	publishMessage(job, taskId, true, count)
}

func proJobPre(job *enums.JobCron) {
	if !schedule_service.CheckAppOnline(job) {
		return
	}
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessagePre(job, true, count)
}

func proJob(job *enums.JobCron, taskId int64) {
	_, count := schedule_service.CheckJobRunningCount(job)
	publishMessage(job, taskId, true, count)
}

func ultraJobPre(job *enums.JobCron) {
	if !schedule_service.CheckAppOnline(job) {
		return
	}
	canRun, count := schedule_service.CheckJobRunningCount(job)
	if !canRun {
		return
	}
	publishMessagePre(job, true, count)
}

func ultraJob(job *enums.JobCron, taskId int64) {
	_, count := schedule_service.CheckJobRunningCount(job)
	publishMessage(job, taskId, true, count)
}

func publishMessagePre(job *enums.JobCron, endKvKey bool, count int) {
	message := getJobMessagePre(job, endKvKey)
	message.JobPubMessage.JobRunningCount = count

	//写库
	task_service.CreateJob(job, &message)
	//增加缓存过期超时回调;暂时不在这里增加,统一由监听key变更来增加超时
	cache.Set(message.JobKeyKvKey, message.JobPubMessage.JobEndKvKey, time.Duration(job.TimeoutSeconds)*time.Second)
	//将任务加入kv中
	schedule_service.SetJobKeyResultKV(job.NatsClient, &message)

	//发送消息
	jobStartTopic := topic.JobPreStartSubj(job)
	schedule_service.Publish(job.NatsClient, jobStartTopic, &message.JobPubMessage)
}

func publishMessage(job *enums.JobCron, taskId int64, endKvKey bool, count int) {
	message := getJobMessage(job, taskId, endKvKey)
	message.JobPubMessage.JobRunningCount = count

	//设置结束kv
	schedule_service.SetJobResultKV(job.NatsClient, &message)

	jobStartTopic := topic.JobStartSubj(job)
	schedule_service.Publish(job.NatsClient, jobStartTopic, &message.JobPubMessage)
}
