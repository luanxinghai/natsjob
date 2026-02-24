package logger

import (
	"natsjob/config"
	"os"
	"strings"

	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// var Log *zap.SugaredLogger
var log *zap.Logger

func InitLogger() {

	// 设置日志输出格式为 JSON
	encoderConfig := zap.NewProductionEncoderConfig()
	// 自定义时间格式
	encoderConfig.EncodeTime = zapcore.TimeEncoderOfLayout("2006-01-02 15:04:05.000Z07:00")
	// 如果你不想带颜色，可以注释掉下一行
	//encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder

	var encoder zapcore.Encoder
	if strings.ToLower(config.EnvParam.LogEnv) == "json" {
		encoder = zapcore.NewJSONEncoder(encoderConfig)
	} else {
		encoder = zapcore.NewConsoleEncoder(encoderConfig)
	}

	writer := getLogWriter()
	// 设置日志等级
	level := zapcore.InfoLevel
	core := zapcore.NewCore(encoder, writer, level)
	log = zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	//Log = logger.Sugar()
}

func getLogWriter() zapcore.WriteSyncer {
	// 自动创建 logs 目录（如果不存在）
	if _, err := os.Stat("logs"); os.IsNotExist(err) {
		_ = os.Mkdir("logs", 0755)
	}

	lumberJackLogger := &lumberjack.Logger{
		Filename:   "logs/app.log",
		MaxSize:    500,
		MaxBackups: 10,
		MaxAge:     7,
		Compress:   true,
	}
	// 同时写入日志文件 + 控制台（开发环境）
	return zapcore.NewMultiWriteSyncer(
		zapcore.AddSync(lumberJackLogger),
		zapcore.AddSync(os.Stdout),
	)
}

func Info(msg string, fields ...zapcore.Field) {
	log.Info(msg, fields...)
}
func Error(msg string, fields ...zapcore.Field) {
	log.Error(msg, fields...)
}
func Warn(msg string, fields ...zapcore.Field) {
	log.Warn(msg, fields...)
}
func Debug(msg string, fields ...zapcore.Field) {
	log.Debug(msg, fields...)
}
func Fatal(msg string, fields ...zapcore.Field) {
	log.Fatal(msg, fields...)
}
func Panic(msg string, fields ...zapcore.Field) {
	log.Panic(msg, fields...)
}
func Sync() {
	_ = log.Sync()
}
