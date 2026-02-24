package ids

import (
	"natsjob/logger"
	"strings"
	"time"

	"github.com/bwmarrin/snowflake"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

var node *snowflake.Node

func init() {
	//snowflake.Epoch = time.Now().Unix()
	snowflake.Epoch = 1288834974657
	newNode, err := snowflake.NewNode(1)
	if err != nil {
		logger.Error("snowflake init error", zap.Error(err))
	}
	node = newNode
}

func Id() int64 {
	return node.Generate().Int64()
}
func IdStr() string {
	return node.Generate().String()
}
func IdBase64() string {
	return node.Generate().Base64()
}
func IdBase2() string {
	return node.Generate().Base2()
}

func Id7DaysAgoMin() int64 {
	return IdAgoDayMin(7)
}

/**
 * 获取指定时间之前的最小ID
 */
func IdAgoDayMin(days int64) int64 {
	daysAgo := time.Now().UTC().Add(-time.Duration(days) * 24 * time.Hour)
	daysAgoMs := daysAgo.UnixMilli()
	snowflakeTime := daysAgoMs - snowflake.Epoch
	return snowflakeTime << 22
}
func IdAgoHourMin(hours int64) int64 {
	daysAgo := time.Now().UTC().Add(-time.Duration(hours) * time.Hour)
	daysAgoMs := daysAgo.UnixMilli()
	snowflakeTime := daysAgoMs - snowflake.Epoch
	return snowflakeTime << 22
}
func UUID() string {
	return uuid.New().String()
}

func UUIDCompact() string {
	return strings.ReplaceAll(uuid.New().String(), "-", "")
}

func UUIDNew() string {
	return uuid.NewString()
}

func UUIDNewCompact() string {
	return strings.ReplaceAll(uuid.NewString(), "-", "")
}
func UUIDNewV7() string {
	v7, _ := uuid.NewV7()
	return v7.String()
}
func UUIDNewV7Compact() string {
	v7, _ := uuid.NewV7()
	return strings.ReplaceAll(v7.String(), "-", "")
}
