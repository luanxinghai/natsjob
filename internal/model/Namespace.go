package model

import "time"

type NjNamespace struct {
	ID          int64     `gorm:"primaryKey;autoIncrement:false;comment:'id'"`
	Name        string    `gorm:"size:64;not null;comment:'命名空间'"`
	Description string    `gorm:"size:256;not null;comment:'命名空间描述'"`
	Deleted     int32     `gorm:"default:0;comment:'删除标记'"`
	CreatedAt   time.Time `gorm:"precision:6;comment:'创建时间'"`
	UpdatedAt   time.Time `gorm:"precision:6;comment:'更新时间'"`
}
