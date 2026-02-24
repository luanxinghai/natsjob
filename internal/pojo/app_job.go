package pojo

import (
	"natsjob/pkg/web/page"
)

type AppJobQuery struct {
	page.Pagination
	AppId    string `json:"AppId" binding:"required"`
	Name     string `json:"name"`
	Status   *int8  `json:"status"`
	Category string `json:"category"`
	Model    string `json:"model"`
}
type AppJobDto struct {
	Name           string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description    string `json:"description" binding:"omitempty,min=1,max=256"`
	AppId          string `json:"appId" binding:"required"`
	NamespaceId    string `json:"namespaceId" binding:"required"`
	Cron           string `json:"cron" binding:"required"`
	Category       string `json:"category" binding:"required"`
	Model          string `json:"model" binding:"required"`
	Status         int8   `json:"status" binding:"min=0,max=1"`
	Condition      string `json:"condition"`
	MaxWorkers     int32  `json:"maxWorkers"`
	TimeoutSeconds int32  `json:"timeoutSeconds"`
	Reason         string `json:"reason"`
	Args           string `json:"args"`
	StartAt        string `json:"startAt"`
	EndAt          string `json:"endAt"`
}

type AppJobUpdateDto struct {
	ID             string `json:"id" binding:"required"`
	Name           string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description    string `json:"description" binding:"omitempty,min=1,max=256"`
	AppId          string `json:"appId" binding:"required"`
	Cron           string `json:"cron" binding:"required"`
	Category       string `json:"category" binding:"required"`
	Model          string `json:"model" binding:"required"`
	Status         int8   `json:"status" binding:"min=0,max=1"`
	Condition      string `json:"condition"`
	MaxWorkers     int32  `json:"maxWorkers"`
	TimeoutSeconds int32  `json:"timeoutSeconds"`
	Reason         string `json:"reason"`
	Args           string `json:"args"`
	StartAt        string `json:"startAt"`
	EndAt          string `json:"endAt"`
}
type AppJobGetDto struct {
	ID string `json:"id" binding:"required"`
}
type AppJobRemoveDto struct {
	ID string `json:"id" binding:"required"`
}

type AppJobVo struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	Cron           string `json:"cron"`
	Category       string `json:"category"`
	Model          string `json:"model"`
	Status         int8   `json:"status"`
	Condition      string `json:"condition"`
	MaxWorkers     int32  `json:"maxWorkers"`
	TimeoutSeconds int32  `json:"timeoutSeconds"`
	Description    string `json:"description"`
	Reason         string `json:"reason"`
	Args           string `json:"args"`
	AppId          string `json:"appId"`
	NamespaceId    string `json:"namespaceId"`
	StartAt        string `json:"startAt"`
	EndAt          string `json:"endAt"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}
