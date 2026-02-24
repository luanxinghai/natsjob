package enums

import (
	"natsjob/internal/core/register/client_reg"

	"github.com/robfig/cron/v3"
)

/*
*
定时任务消息
*/
type JobCron struct {
	NamespaceId     int64                        `json:"namespaceId"`
	Namespace       string                       `json:"namespace"` //命名空间
	AppId           int64                        `json:"appId"`
	AppName         string                       `json:"appName"` //应用名称,即: 服务名
	JobId           int64                        `json:"jobId"`
	JobName         string                       `json:"jobName"`
	JobCategory     string                       `json:"jobCategory"`
	JobModel        string                       `json:"jobModel"`
	Condition       string                       `json:"condition"`
	Cron            string                       `json:"cron"`
	MaxWorkers      int                          `json:"maxWorkers"`     // 最大并发数
	TimeoutSeconds  int32                        `json:"timeoutSeconds"` //任务超时时长
	JobArgs         string                       `json:"JobArgs"`        //用户自定义任务参数
	EntryID         cron.EntryID                 `json:"entryId"`
	JobCronCmd      func(jobCron *JobCron)       `json:"-"` //任务执行方法
	NatsClient      *NatsClient                  `json:"-"`
	AppClientRegMap *client_reg.ClientRegManager `json:"-"`
	LastClientId    string                       `json:"lastClientId"` //上一次执行的客户端id
}

/*
*
任务信息
*/
type JobMessage struct {
	TaskId        int64         `json:"taskId"`
	JobId         int64         `json:"jobId"`
	JobKeyKvKey   string        `json:"jobKeyKvKey"`
	JobPubMessage JobPubMessage `json:"jobPubMessage"`
}

/*
*
发布给客户端任务
*/
type JobPubMessage struct {
	TaskId               string `json:"taskId"`
	Namespace            string `json:"namespace"`
	AppName              string `json:"appName"`
	JobName              string `json:"jobName"`
	JobCategory          string `json:"jobCategory"`
	JobModel             string `json:"jobModel"`
	Condition            string `json:"condition"`
	JobArgs              string `json:"jobArgs"`
	JobCreatedAt         string `json:"jobCreatedAt"`
	JobExpireTime        string `json:"jobExpireTime"` //任务超时时间
	JobEndKvKey          string `json:"jobEndKvKey"`
	JobEndResultKvBucket string `json:"jobEndResultKvBucket"`
	JobRunningCount      int    `json:"jobRunningCount"` //任务正在执行数量
	NextPayload          string `json:"nextPayload"`     //用户自定义next下个任务的随路参数
}
