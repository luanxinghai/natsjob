package pojo

import (
	"natsjob/pkg/web/page"
)

type AppJobResultQuery struct {
	page.Pagination
	JobId          string `json:"jobId" binding:"required"`
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
}

type AppJobResultVo struct {
	ID             string `json:"id"`
	NamespaceId    string `json:"namespaceId"`
	Namespace      string `json:"namespace"`
	AppID          string `json:"appId"`
	AppName        string `json:"appName"`
	JobId          string `json:"jobId"`
	JobName        string `json:"jobName"`
	Category       string `json:"category"`
	Model          string `json:"model"`
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
	TimeSpan       string `json:"timeSpan"`
	StartAt        string `json:"startAt"`
	EndAt          string `json:"endAt"`
	ExpiredAt      string `json:"expiredAt"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}
