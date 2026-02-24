package natsclient

import (
	"natsjob/config"
	"natsjob/internal/core/enums"
	"natsjob/logger"
	"time"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

var nc *nats.Conn
var err error

func Connect(natsClient *enums.NatsClient) {
	// 设置连接选项
	opts := []nats.Option{
		nats.Name("natsjob"), // 客户端名称
		// 自动重连：启用
		nats.ReconnectWait(2 * time.Second), // 每次重连等待时间
		// 最大重连次数：-1 表示无限重试
		nats.MaxReconnects(-1),
		// 连接超时
		nats.Timeout(5 * time.Second),
		// Ping 间隔：客户端定期发送 PING 以检测连接是否存活
		nats.PingInterval(20 * time.Second),
		// 重连线程最大延迟
		nats.ReconnectBufSize(1024 * 1024), // 缓冲区大小，用于重连期间暂存消息
		// 添加事件回调函数
		nats.DiscoveredServersHandler(func(nc *nats.Conn) {
			logger.Info("Discovered new servers", zap.Strings("servers", nc.Servers()))
		}),
		nats.ReconnectHandler(func(nc *nats.Conn) {
			logger.Info("Reconnected to NATS server success", zap.String("url", nc.ConnectedUrl()))
			ConnectOK(natsClient)
		}),
		nats.DisconnectErrHandler(func(nc *nats.Conn, err error) {
			logger.Error("Disconnected from NATS server", zap.Error(err))
		}),
		nats.ClosedHandler(func(nc *nats.Conn) {
			Disconnect(natsClient)
			logger.Info("NATS connection closed")
		}),
		nats.ConnectHandler(func(nc *nats.Conn) {
			logger.Info("Connected to NATS server success", zap.String("url", nc.ConnectedUrl()))
			ConnectOK(natsClient)
		}),
		nats.ErrorHandler(func(nc *nats.Conn, sub *nats.Subscription, err error) {
			Disconnect(natsClient)
			logger.Error("NATS error", zap.Error(err))
		}),
		nats.ReconnectErrHandler(func(nc *nats.Conn, err error) {
			Disconnect(natsClient)
			logger.Error("Failed to connect to NATS server, retrying in 2 seconds...",
				zap.String("url", config.EnvParam.NatsUrl),
				zap.Error(err),
			)
		}),
		nats.RetryOnFailedConnect(true),
	}

	nc, err = nats.Connect(config.EnvParam.NatsUrl, opts...)
	if err != nil {
		Disconnect(natsClient)
		logger.Error("Failed to initialize connection to NATS server, retrying in 2 seconds...",
			zap.String("url", config.EnvParam.NatsUrl),
			zap.Error(err),
		)
	}
	natsClient.Nc = nc
}

func ConnectOK(natsClient *enums.NatsClient) {
	natsClient.Connected.Store(true)
	natsClient.ConnectOK()

	// 初始化 JetStream 和 KeyValue
	initJs()
	initKV()
}

func Disconnect(natsClient *enums.NatsClient) {
	natsClient.Connected.Store(false)
	natsClient.Disconnect()
}

func KeyValue(bucket string) (nats.KeyValue, error) {
	js, _ := nc.JetStream()
	return js.KeyValue(bucket)
}
