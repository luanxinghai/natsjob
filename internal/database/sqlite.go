package database

import (
	"natsjob/logger"
	"os"
	"path/filepath"

	"github.com/glebarez/sqlite"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func getSqlite() *gorm.DB {
	wd, _ := os.Getwd()
	dbPath := filepath.Join(wd, "data", "natsjob.db")
	// 确保目录存在
	err := os.MkdirAll(filepath.Dir(dbPath), 0755)
	if err != nil {
		logger.Error("create db dir fail", zap.Error(err))
	}

	// 2. 连接数据库
	db, err := gorm.Open(sqlite.Open("./data/natsjob.db"), &gorm.Config{
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
