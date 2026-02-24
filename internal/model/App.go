package model

import "time"

type NjApp struct {
	ID          int64     `gorm:"primaryKey;autoIncrement:false;comment:'id'"`
	Name        string    `gorm:"size:64;not null;comment:'应用名称'"`
	Description string    `gorm:"size:256;comment:'命名空间描述'"`
	NamespaceId int64     `gorm:"not null;comment:'命名空间ID'"`
	Deleted     int8      `gorm:"default:0;comment:'删除标记';default:0;index:idx_app_deleted"`
	CreatedAt   time.Time `gorm:"precision:6;comment:'创建时间'"`
	UpdatedAt   time.Time `gorm:"precision:6;comment:'更新时间'"`
}
