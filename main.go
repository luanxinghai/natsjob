package main

import (
	"embed"
	"io/fs"
	"natsjob/config"
	"natsjob/internal/core/boot"
	"natsjob/logger"
	"natsjob/pkg/version"
	"natsjob/router"
	"net/http"

	"go.uber.org/zap"
)

var (
	Version   = "dev"
	BuildTime = "*"
)

//go:embed all:static
var files embed.FS

func main() {
	//初始化参数
	config.InitEnvParam()

	//初始化日志
	logger.InitLogger()
	defer logger.Sync()

	starSeaPattern := `

                  ★   ✦   ☆       ✦   ★
                ✧       乱       n ✧   ☆
                  ✦   星   a   ✦       ✧
                ☆       海   t       ☆   ✦
                  ✧   s   j   ✧       ☆
                ★       o       ★   ✧
                  ✦       b       ✦   ★
                ~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~
                         古或今
                       Apache 2.0
                ~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~≋~

    `
	logger.Info(starSeaPattern)
	//增加版本信息
	version.Set(Version, BuildTime)
	logger.Info("✨🕰️🧙⏳ 欢迎来到乱星海 时间法则大修士:古或今 调度千端任务,照破万古长夜 ⏳🧙🕰️✨")
	logger.Info("natsjob version", zap.Any("version", version.Get()))

	logger.Info("natsjob init env-params", zap.Any("envParams", config.EnvParam))
	boot.InitServer()
	//web
	r := router.InitRouter()
	fp, _ := fs.Sub(files, "static")
	r.StaticFS("/", http.FS(fp))

	//启动服务
	logger.Info("natsjob start")
	err := r.Run(":" + config.EnvParam.HttpPort)
	if err != nil {
		logger.Fatal("natsjob start fail...", zap.Error(err))
	}
}
