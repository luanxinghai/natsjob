package enums

type AppJobMonitorInfo struct {
	TaskID         string `json:"taskId"`
	SubTaskId      string `json:"subTaskId"`
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
	CreateAt       string `json:"createAt"`
	Namespace      string `json:"namespace"`
	AppName        string `json:"appName"`
	JobName        string `json:"jobName"`
}
