package database

import (
	"natsjob/config"
	"natsjob/logger"

	"go.uber.org/zap"
	"gorm.io/gorm/schema"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getPgsql() *gorm.DB {
	dsn := config.EnvParam.DBUrl
	// 2. 连接数据库
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
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
