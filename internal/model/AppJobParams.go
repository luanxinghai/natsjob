package model

import "time"

type NjAppJobParams struct {
	ID          int64     `gorm:"primaryKey;autoIncrement:false;comment:'id'"`
	Name        string    `gorm:"size:64;comment:'名称'"`
	ClientID    string    `gorm:"size:64;comment:'客户端id'"`
	SceneID     string    `gorm:"size:64;comment:'场景id'"`
	SceneName   string    `gorm:"size:64;comment:'场景名称'"`
	Description string    `gorm:"size:256;comment:'描述'"`
	Args        string    `gorm:"size:1000;comment:'参数'"`
	Priority    int32     `gorm:"default:0;comment:'优先级'"`
	Weight      int32     `gorm:"default:0;comment:'权重'"`
	JobId       int64     `gorm:"not null;comment:'作业id'"`
	Deleted     int32     `gorm:"default:0;comment:'删除标记'"`
	CreatedAt   time.Time `gorm:"precision:6;comment:'创建时间'"`
	UpdatedAt   time.Time `gorm:"precision:6;comment:'更新时间'"`
}
