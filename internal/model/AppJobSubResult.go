package model

import "time"

type NjAppJobSubResult struct {
	ID             int64      `gorm:"primaryKey;autoIncrement:false;comment:'id'"`
	ParentID       int64      `gorm:"comment:'父任务id';index"`
	ClientID       string     `gorm:"size:64;not null;comment:'客户端id'"`
	SceneID        string     `gorm:"size:64;not null;comment:'场景id'"`
	SceneName      string     `gorm:"size:64;not null;comment:'场景名称'"`
	NamespaceId    int64      `gorm:"not null;comment:'命名空间ID'"`
	Namespace      string     `gorm:"size:64;not null;comment:'命名空间'"`
	AppID          int64      `gorm:"not null;comment:'应用ID'"`
	AppName        string     `gorm:"size:64;not null;comment:'应用名称'"`
	JobId          int64      `gorm:"not null;comment:'作业id'"`
	JobName        string     `gorm:"size:64;not null;comment:'作业名称'"`
	Category       string     `gorm:"size:64;not null;comment:'策略'"`
	Model          string     `gorm:"size:64;not null;comment:'模式'"`
	Status         string     `gorm:"size:64;comment:状态"`
	Reason         string     `gorm:"size:1024;not null;comment:'结果说明'"`
	MonitorStatus  string     `gorm:"size:64;comment:'监控状态'"`
	MonitorPayload string     `gorm:"size:1024;comment:'监控随路数据'"`
	TimeSpan       int64      `gorm:"comment:'耗时'"`
	StartAt        *time.Time `gorm:"precision:6;comment:'开始时间'"`
	EndAt          *time.Time `gorm:"precision:6;comment:'结束时间'"`
	CreatedAt      time.Time  `gorm:"precision:6;comment:'创建时间'"`
	UpdatedAt      time.Time  `gorm:"precision:6;comment:'更新时间'"`
}
