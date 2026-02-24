package natsclient

import (
	"natsjob/config"
	"natsjob/logger"
	"time"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func initJs() {
	js, err := nc.JetStream()
	if err != nil {
		logger.Error("无法获取 JetStream 上下文:", zap.Error(err))
		return
	}

	streamName := config.EnvParam.TopicPrefix
	streamNameSubj := config.EnvParam.TopicPrefix + ".>"
	//检测stream存在不处理,不存在创建
	_, err = js.StreamInfo(streamName)

	streamConfig := nats.StreamConfig{
		Name:        streamName,
		Subjects:    []string{streamNameSubj},
		Description: config.EnvParam.AppName,
		Storage:     nats.FileStorage,
		Retention:   nats.LimitsPolicy,
		MaxMsgs:     -1,
		MaxBytes:    -1,
		MaxAge:      time.Hour * 24,
		Replicas:    1,
		Discard:     nats.DiscardOld,
		NoAck:       false,
		AllowDirect: true,
		AllowRollup: true,
	}
	if err != nil {
		logger.Info("检测stream不存在", zap.String("stream", streamName), zap.Error(err))
		addStream(js, &streamConfig)
	} else {
		updateStream(js, &streamConfig)
	}

}

func updateStream(js nats.JetStreamContext, config *nats.StreamConfig) {
	_, err = js.UpdateStream(config)
	if err != nil {
		logger.Error("updateStream failed:", zap.Error(err))
	} else {
		logger.Info("updateStream success", zap.Any("streamConfig", config))
	}
}

func addStream(js nats.JetStreamContext, config *nats.StreamConfig) {
	_, err = js.AddStream(config)
	if err != nil {
		logger.Error("addStream failed:", zap.Error(err))
	} else {
		logger.Info("addStream success", zap.Any("streamConfig", config))
	}
}
