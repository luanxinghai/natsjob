package topic

import (
	"natsjob/internal/core/enums"
	"natsjob/pkg/dotutil"
	"natsjob/pkg/strutil"
	"strings"
)

type KVKeyStruct struct {
	JobKey          string
	JobPreEnd       string
	JobEnd          string
	JobClientEnd    string
	JobGroupEnd     string
	JobAgentEnd     string
	HeartbeatServer string
	HeartbeatClient string
	MasterServer    string
	JobUpdate       string
}

var KV_JOB_KEY = KVKeyStruct{
	JobKey:          "natsjob.job.key",
	JobPreEnd:       "natsjob.job.pre-end",
	JobEnd:          "natsjob.job.end",
	JobClientEnd:    "natsjob.job.client-end",
	JobGroupEnd:     "natsjob.job.group-end",
	JobAgentEnd:     "natsjob.job.agent-end",
	HeartbeatServer: "natsjob.heartbeat.server",
	HeartbeatClient: "natsjob.heartbeat.client",
	MasterServer:    "natsjob.master.server",
	JobUpdate:       "natsjob.job.update",
}

/*
*
核心任务key
*/
func JobKey(task *enums.JobCron, taskId int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobKey, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId))
}

/*
*
任务结束key
*/
func JobEndKey(task *enums.JobCron, taskId int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobEnd, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId))
}
func JobClientEndKey(task *enums.JobCron, taskId int64, clientIdKey int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobClientEnd, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId), strutil.ToStr(clientIdKey))
}
func JobPreEndKey(task *enums.JobCron, taskId int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobPreEnd, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId))
}
func JobGroupEndKey(task *enums.JobCron, taskId int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobGroupEnd, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId))
}
func JobAgentEndKey(task *enums.JobCron, taskId int64) string {
	return strutil.JoinByDot(KV_JOB_KEY.JobAgentEnd, task.Namespace, task.AppName, task.JobName, strutil.ToStr(taskId))
}
func HeartbeatServerKey(ns string, id string) string {
	return strutil.JoinByDot(KV_JOB_KEY.HeartbeatServer, ns, id)
}

func HeartbeatClientKey(ns string, id string) string {
	return strutil.JoinByDot(KV_JOB_KEY.HeartbeatClient, ns, id)
}

func AppJobByKey(jobKey string) string {
	//natsjob.job.end.app.biz.owner.2009639777866878976
	dp := dotutil.NewDotPath(jobKey)
	return dp.Range(3, 5)
}
func TaskIdByKey(jobPreEndKey string) string {
	//natsjob.job.pre-end.app.biz.owner.2009639777866878976
	dp := dotutil.NewDotPath(jobPreEndKey)
	return dp.Part(6)
}
func TaskIntIdByKey(jobEndKey string) int64 {
	//natsjob.job.end.app.biz.owner.2009639777866878976
	dp := dotutil.NewDotPath(jobEndKey)
	i, _ := strutil.ToInt64(dp.Part(6))
	return i
}

func JobClientEndKeyPrefix(jobClientEndKey string) string {
	//natsjob.job.client-end.app.biz.owner.2015001088234622976.2015001088234622977
	dp := dotutil.NewDotPath(jobClientEndKey)
	return dp.Range(0, 6) + ".*"
}

func AppJobByName(ns string, appName string, jobName string) string {
	return strutil.JoinByDot(ns, appName, jobName)
}

func AppJobByCron(job *enums.JobCron) string {
	return strutil.JoinByDot(job.Namespace, job.AppName, job.JobName)
}
func IsJobEndPrefix(jobKey string) bool {
	return strings.HasPrefix(jobKey, KV_JOB_KEY.JobEnd)
}

func IsJobPreEndPrefix(jobKey string) bool {
	return strings.HasPrefix(jobKey, KV_JOB_KEY.JobPreEnd)
}

func IsJobClientEndPrefix(jobKey string) bool {
	return strings.HasPrefix(jobKey, KV_JOB_KEY.JobClientEnd)
}

func IsJobGroupEndPrefix(jobKey string) bool {
	return strings.HasPrefix(jobKey, KV_JOB_KEY.JobGroupEnd)
}
func IsJobAgentEndPrefix(jobKey string) bool {
	return strings.HasPrefix(jobKey, KV_JOB_KEY.JobAgentEnd)
}

/*
*
主节点key
*/
func MasterServerKey(ns string) string {
	return strutil.JoinByDot(KV_JOB_KEY.MasterServer, ns)
}

func JobUpdateKey() string {
	return KV_JOB_KEY.JobUpdate
}
