package enums

import (
	"time"
)

/*
*
任务结果
*/
type AppJobResultInfo struct {
	ID             int64     `json:"id"`
	Status         string    `json:"status"`
	Reason         string    `json:"reason"`
	MonitorStatus  string    `json:"monitorStatus"`
	MonitorPayload string    `json:"monitorPayload"`
	CreateAt       string    `json:"createAt"`
	ExpireEndTime  time.Time `json:"expireEndTime"`
	Namespace      string    `json:"namespace"`
	AppName        string    `json:"appName"`
	JobName        string    `json:"jobName"`
}

type JobResultStatusInfo struct {
	Create      string `json:"create"`
	Success     string `json:"success"`
	SuccessNext string `json:"successNext"`
	Fail        string `json:"fail"`
	Expired     string `json:"expired"`
}

type JobSceneInfo struct {
	SYS string `json:"sys"`
}

// 任务结果状态信息
var JOB_RESULT_STATUS = JobResultStatusInfo{
	Create:      "create",
	Success:     "success",
	SuccessNext: "success:next",
	Fail:        "fail",
	Expired:     "expired",
}

// 系统场景信息
var JOB_SCENE = JobSceneInfo{
	SYS: "sys",
}
