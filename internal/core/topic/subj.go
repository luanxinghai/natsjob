package topic

import (
	"natsjob/internal/core/enums"
	"natsjob/pkg/dotutil"
	"natsjob/pkg/strutil"
	"strings"
)

type SubjStruct struct {
	VoidStart     string
	VoidPreStart  string
	PreStart      string
	Start         string
	ClientStart   string
	GroupStart    string
	AgentStart    string
	SubResultFlow string
	Monitor       string
}

var JOB_SUBJ = SubjStruct{
	VoidStart:     "natsjob-void.job.start",
	VoidPreStart:  "natsjob-void.job.pre-start",
	PreStart:      "natsjob.job.pre-start",
	Start:         "natsjob.job.start",
	ClientStart:   "natsjob.job.client-start",
	GroupStart:    "natsjob.job.group-start",
	AgentStart:    "natsjob.job.agent-start",
	SubResultFlow: "natsjob.job.sub-result-flow",
	Monitor:       "natsjob.job.monitor",
}

func JobVoidStartSubj(task *enums.JobCron) string {
	return strutil.JoinByDot(JOB_SUBJ.VoidStart, task.Namespace, task.AppName, task.JobName)
}

func JobVoidPreStartSubj(task *enums.JobCron) string {
	return strutil.JoinByDot(JOB_SUBJ.VoidPreStart, task.Namespace, task.AppName, task.JobName)
}

func JobPreStartSubj(task *enums.JobCron) string {
	return strutil.JoinByDot(JOB_SUBJ.PreStart, task.Namespace, task.AppName, task.JobName)
}
func JobStartSubj(task *enums.JobCron) string {
	return strutil.JoinByDot(JOB_SUBJ.Start, task.Namespace, task.AppName, task.JobName)
}
func JobClientStartSubj(task *enums.JobCron, clientId string) string {
	return strutil.JoinByDot(JOB_SUBJ.ClientStart, task.Namespace, task.AppName, task.JobName, clientId)
}

func JobGroupStartSubj(task *enums.JobCron) string {
	return strutil.JoinByDot(JOB_SUBJ.GroupStart, task.Namespace, task.AppName, task.JobName)
}

// 通过jobKey 获取endKey
func JobEndKeyByKey(jobKey string) string {
	return strings.Replace(jobKey, KV_JOB_KEY.JobKey, KV_JOB_KEY.JobEnd, 1)
}
func JobEndKeyByPreEndKey(jobPreEndKey string) string {
	return strings.Replace(jobPreEndKey, KV_JOB_KEY.JobPreEnd, KV_JOB_KEY.JobEnd, 1)
}

// 通过jobEndKey 获取jobKey
func JobKeyByEndKey(jobEndKey string) string {
	return strings.Replace(jobEndKey, KV_JOB_KEY.JobEnd, KV_JOB_KEY.JobKey, 1)
}

func JobKeyByPreEndKey(jobPreEndKey string) string {
	return strings.Replace(jobPreEndKey, KV_JOB_KEY.JobPreEnd, KV_JOB_KEY.JobKey, 1)
}

func JobKeyByClientEndKey(jobClientEndKey string) string {
	//  natsjob.job.client-end.app.biz.owner.2015001088234622976.2015001088234622977
	jobKey := strings.Replace(jobClientEndKey, KV_JOB_KEY.JobClientEnd, KV_JOB_KEY.JobKey, 1)
	dp := dotutil.NewDotPath(jobKey)
	return dp.Range(0, 6)
}

func JobKeyByClientEndSubKey(jobClientEndKey string) string {
	//  natsjob.job.client-end.app.biz.owner.2015001088234622976.2015001088234622977
	dp := dotutil.NewDotPath(jobClientEndKey)
	return dp.Part(7)
}
