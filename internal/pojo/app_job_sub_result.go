package pojo

import (
	"natsjob/pkg/web/page"
)

type AppJobSubResultQuery struct {
	page.Pagination
	TaskId         string `json:"taskId" binding:"required"`
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
}

type AppJobSubResultVo struct {
	ID             string `json:"id" comment:"id"`
	ParentID       string `json:"parentId" comment:"父任务id"`
	ClientID       string `json:"clientId" comment:"客户端id"`
	SceneID        string `json:"sceneId" comment:"场景id"`
	SceneName      string `json:"sceneName" comment:"场景名称"`
	NamespaceId    string `json:"namespaceId" comment:"命名空间ID"`
	Namespace      string `json:"namespace" comment:"命名空间"`
	AppID          string `json:"appId" comment:"应用ID"`
	AppName        string `json:"appName" comment:"应用名称"`
	JobId          string `json:"jobId" comment:"作业id"`
	JobName        string `json:"jobName" comment:"作业名称"`
	Category       string `json:"category" comment:"策略"`
	Model          string `json:"model" comment:"模式"`
	Status         string `json:"status" comment:"状态"`
	Reason         string `json:"reason" comment:"结果说明"`
	MonitorStatus  string `json:"monitorStatus" comment:"监控状态"`
	MonitorPayload string `json:"monitorPayload" comment:"监控随路数据"`
	TimeSpan       string `json:"timeSpan" comment:"耗时"`
	StartAt        string `json:"startAt,omitempty" comment:"开始时间"`
	EndAt          string `json:"endAt,omitempty" comment:"结束时间"`
	CreatedAt      string `json:"createdAt" comment:"创建时间"`
	UpdatedAt      string `json:"updatedAt" comment:"更新时间"`
}
