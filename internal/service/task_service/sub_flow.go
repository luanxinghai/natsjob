package task_service

import "natsjob/pkg/flexstring"

type JobSubFlowMessage struct {
	TaskId         flexstring.FlexString `json:"taskId"`
	Namespace      string                `json:"namespace"`
	AppName        string                `json:"appName"`
	JobName        string                `json:"jobName"`
	ClientId       string                `json:"clientId"`
	SceneId        string                `json:"sceneId"`
	SceneName      string                `json:"sceneName"`
	Status         string                `json:"status"`
	Reason         string                `json:"reason"`
	MonitorStatus  string                `json:"monitorStatus"`
	MonitorPayload string                `json:"monitorPayload"`
	StartAt        flexstring.FlexString `json:"startAt"`
	EndAt          flexstring.FlexString `json:"endAt"`
}
