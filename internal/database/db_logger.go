package database

import (
	"context"
	"fmt"
	"natsjob/logger"
	"time"

	"go.uber.org/zap"
	gormLogger "gorm.io/gorm/logger"
)

// -------------------------- 核心：自定义日志器，实现logger.Interface接口 --------------------------
type DatabaseLogger struct {
	LogLevel                  gormLogger.LogLevel
	Colorful                  bool
	SlowThreshold             time.Duration
	IgnoreRecordNotFoundError bool
	ParameterizedQueries      bool
}

// 实现logger.Interface的核心方法，所有SQL日志都会走这个方法，完全自定义输出内容
func (l DatabaseLogger) LogMode(level gormLogger.LogLevel) gormLogger.Interface {
	newLogger := l
	newLogger.LogLevel = level
	return &newLogger
}

func (l DatabaseLogger) Info(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= gormLogger.Info {
		//l.printMsg("INFO", msg, data...)
		logger.Info("GORM-INFO", zap.String("msg", fmt.Sprintf(msg, data...)))
	}
}

func (l DatabaseLogger) Warn(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= gormLogger.Warn {
		//l.printMsg("WARN", msg, data...)
		logger.Warn("GORM-WARN", zap.String("msg", fmt.Sprintf(msg, data...)))
	}
}

func (l DatabaseLogger) Error(ctx context.Context, msg string, data ...interface{}) {
	if l.LogLevel >= gormLogger.Error {
		//l.printMsg("ERROR", msg, data...)
		logger.Error("GORM-ERROR", zap.String("msg", fmt.Sprintf(msg, data...)))
	}
}

func (l DatabaseLogger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	if l.LogLevel <= gormLogger.Silent {
		return
	}

	elapsed := time.Since(begin)
	sql, rows := fc()
	if err != nil && !(l.IgnoreRecordNotFoundError) {
		//fmt.Printf("[GORM-SQL] [ERROR] %s [耗时: %v] [影响行数: %d] \n", sql, elapsed, rows)
		logger.Error("GORM-SQL", zap.String("sql", sql), zap.Duration("elapsed", elapsed), zap.Int64("rows", rows), zap.Error(err))
		return
	}

	if l.SlowThreshold != 0 && elapsed > l.SlowThreshold {
		//fmt.Printf("[GORM-SQL] [SLOW] %s [耗时: %v] [影响行数: %d] \n", sql, elapsed, rows)
		logger.Warn("GORM-SQL", zap.String("sql", sql), zap.Duration("elapsed", elapsed), zap.Int64("rows", rows))
		return
	}

	if l.LogLevel >= gormLogger.Info {
		//fmt.Printf("[GORM-SQL] %s [耗时: %v] [影响行数: %d] \n", sql, elapsed, rows)
		logger.Info("GORM-SQL", zap.String("sql", sql), zap.Duration("elapsed", elapsed), zap.Int64("rows", rows))
	}
}

func (l DatabaseLogger) printMsg(level string, msg string, data ...interface{}) {
	//fmt.Printf("[GORM-%s] %s \n", level, fmt.Sprintf(msg, data...))
	logger.Info("GORM-"+level, zap.String("msg", fmt.Sprintf(msg, data...)))
}

// 配置日志，方便查看自动生成的 SQL
// newLogger := gormLogger.New(
//
//	log.New(os.Stdout, "\r\n", log.LstdFlags), // 输出到控制台
//	gormLogger.Config{
//		SlowThreshold: time.Second,   // 慢查询阈值
//		LogLevel:      gormLogger.Info, // 打印所有 SQL
//		Colorful:      true,          // 彩色输出
//		//ParameterizedQueries: true,
//	},
//
// )
// 自定义输出日志
var dbLogger = &DatabaseLogger{
	LogLevel:                  gormLogger.Info, // 打印所有SQL
	Colorful:                  true,            // 彩色打印（可关）
	IgnoreRecordNotFoundError: true,            // 忽略查询无结果的错误
	//SlowThreshold:             time.Second,   // 1秒以上为慢SQL
	//ParameterizedQueries:      true,          // 打印带参数的完整SQL
}
