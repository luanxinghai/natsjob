package natsclient

import (
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"time"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func initKV() {
	js, err := nc.JetStream()
	if err != nil {
		logger.Error("get JetStream context error", zap.Error(err))
		return
	}
	heartbeatKV(js)
	jobKeysKV(js)
	jobResultsKV(js)
	jobUpdateKV(js)
	serverLBKV(js)
}

func heartbeatKV(js nats.JetStreamContext) {
	//注册心跳
	bucketName := topic.KV_BUCKET.Heartbeat
	valueConfig := nats.KeyValueConfig{
		Bucket:      bucketName,
		History:     1,
		TTL:         30 * time.Second,
		Description: "heartbeat",
	}
	createOrCheckKVBucket(js, bucketName, &valueConfig)
}
func serverLBKV(js nats.JetStreamContext) {
	bucketName := topic.KV_BUCKET.ServerLB
	valueConfig := nats.KeyValueConfig{
		Bucket:      bucketName,
		History:     1,
		TTL:         30 * time.Second,
		Description: "serverLB",
	}
	createOrCheckKVBucket(js, bucketName, &valueConfig)
}

func jobKeysKV(js nats.JetStreamContext) {
	bucketName := topic.KV_BUCKET.JobKeys
	valueConfig := nats.KeyValueConfig{
		Bucket:      bucketName,
		History:     1,
		TTL:         24 * time.Hour,
		Description: "jobKeys",
	}
	createOrCheckKVBucket(js, bucketName, &valueConfig)
}

func jobResultsKV(js nats.JetStreamContext) {
	bucketName := topic.KV_BUCKET.JobResults
	valueConfig := nats.KeyValueConfig{
		Bucket:      bucketName,
		History:     1,
		TTL:         24 * time.Hour,
		Description: "jobResults",
	}
	createOrCheckKVBucket(js, bucketName, &valueConfig)
}

func jobUpdateKV(js nats.JetStreamContext) {
	bucketName := topic.KV_BUCKET.JobUpdate
	valueConfig := nats.KeyValueConfig{
		Bucket:      bucketName,
		History:     1,
		TTL:         24 * time.Hour,
		Description: "jobUpdate",
	}
	createOrCheckKVBucket(js, bucketName, &valueConfig)
}

// 通用的 KV bucket 创建函数
func createOrCheckKVBucket(js nats.JetStreamContext, bucketName string, config *nats.KeyValueConfig) {
	kv, err := js.KeyValue(bucketName)
	if err == nil {
		// bucket 存在，记录状态信息
		status, _ := kv.Status()
		logKVStatus(status)
		return
	}

	// 创建新 bucket
	kv, err = js.CreateKeyValue(config)
	if err != nil {
		logger.Error("create KV Bucket error",
			zap.String("bucket", bucketName),
			zap.Error(err))
		return
	}
	// 记录创建成功状态
	status, _ := kv.Status()
	logKVStatus(status)
}

func logKVStatus(status nats.KeyValueStatus) {
	logger.Info("KV bucket status success",
		zap.String("bucket", status.Bucket()),
		zap.Uint64("values", status.Values()),
		zap.Int64("history", status.History()),
		zap.String("ttl", status.TTL().String()),
		zap.String("storage", status.BackingStore()),
		zap.Bool("isCompressed", status.IsCompressed()),
		zap.Uint64("bytes", status.Bytes()),
	)
}
