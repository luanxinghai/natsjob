package database

import (
	"natsjob/config"
	"natsjob/internal/driver/dmgorm2"
	"natsjob/logger"

	"go.uber.org/zap"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func getDm() *gorm.DB {
	dsn := config.EnvParam.DBUrl
	// 2. 连接数据库
	db, err := gorm.Open(dmgorm2.Open(dsn), &gorm.Config{
		Logger: dbLogger, // 启用日志
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true, // 禁用复数表名
		},
	})
	if err != nil {
		logger.Fatal("connect db fatal", zap.Error(err))
	}

	return db
}
