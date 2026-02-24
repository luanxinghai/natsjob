package model

import "time"

type NjAppJob struct {
	ID             int64      `gorm:"primaryKey;autoIncrement:false;comment:'id'"`
	Name           string     `gorm:"size:64;not null;comment:'应用作业名称'"`
	Cron           string     `gorm:"size:64;not null;comment:'cron表达式'"`
	Category       string     `gorm:"size:64;not null;comment:'策略'"`
	Model          string     `gorm:"size:64;not null;comment:'模式'"`
	Status         int8       `gorm:"comment:'状态;0-启用,1-停用';default:0;index:idx_appjob_status_deleted" json:"status"`
	Condition      string     `gorm:"size:64;comment:'条件'" json:"condition"`
	MaxWorkers     int32      `gorm:"default:1;comment:'最大工作节点数'" json:"maxWorkers"`
	TimeoutSeconds int32      `gorm:"default:60;comment:'超时秒数'" json:"timeoutSeconds"`
	Description    string     `gorm:"size:256;comment:'描述'"`
	Reason         string     `gorm:"size:256;comment:'原因'"`
	Args           string     `gorm:"size:1000;comment:'参数'"`
	NamespaceId    int64      `gorm:"not null;comment:'命名空间ID'"`
	AppId          int64      `gorm:"not null;comment:'应用ID'"`
	StartAt        *time.Time `gorm:"precision:6;comment:'开始时间'"`
	EndAt          *time.Time `gorm:"precision:6;comment:'结束时间'"`
	Deleted        int8       `gorm:"default:0;comment:'删除标记';default:0;index:idx_appjob_status_deleted"`
	CreatedAt      time.Time  `gorm:"precision:6;comment:'创建时间'"`
	UpdatedAt      time.Time  `gorm:"precision:6;comment:'更新时间'"`
}
