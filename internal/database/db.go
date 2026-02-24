package database

import (
	"natsjob/config"
	"natsjob/internal/dao/query"
	"natsjob/internal/model"
	"natsjob/logger"
	"os"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

var DB *gorm.DB

func GetQuery() *query.Query {
	return query.Use(DB)
}

func InitDB() {
	dbType := config.EnvParam.DBType
	switch dbType {
	case "mysql":
		DB = getMysql()
	case "postgres":
		DB = getPgsql()
	case "dm":
		DB = getDm()
	case "sqlite":
		DB = getSqlite()
	default:
		logger.Error("db type error", zap.String("dbType", dbType))
		os.Exit(1)
	}

	createTable(DB)
	createInitData(DB)
}

func createInitData(db *gorm.DB) {
	db.Where(&model.NjNamespace{ID: 1}).FirstOrCreate(&model.NjNamespace{
		ID:          1,
		Name:        "app",
		Description: "default",
	})
}
func createTable(db *gorm.DB) {
	err := db.AutoMigrate(&model.NjNamespace{})
	if err != nil {
		logger.Error("create table fail", zap.Error(err))
	}

	err = db.AutoMigrate(&model.NjApp{})
	if err != nil {
		logger.Error("create table fail", zap.Error(err))
	}

	err = db.AutoMigrate(&model.NjAppJob{})
	if err != nil {
		logger.Error("create table fail", zap.Error(err))
	}

	//err = db.AutoMigrate(&model.NjAppJobParams{})
	//if err != nil {
	// logger.Error("create table fail", zap.Error(err))
	//}

	err = db.AutoMigrate(&model.NjAppJobSubResult{})
	if err != nil {
		logger.Error("create table fail", zap.Error(err))
	}

	err = db.AutoMigrate(&model.NjAppJobResult{})
	if err != nil {
		logger.Error("create table fail", zap.Error(err))
	}
}
