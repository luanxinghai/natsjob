package cache

import (
	"context"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"time"

	"github.com/jellydator/ttlcache/v3"
	cmap "github.com/orcaman/concurrent-map/v2"
	"go.uber.org/zap"
)

var AppMapCache cmap.ConcurrentMap[string, *ttlcache.Cache[string, string]]
var AppSubMapCache *ttlcache.Cache[string, *ttlcache.Cache[string, string]]
var CmdOnEviction func(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string])
var CmdOnEvictionSub func(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string])

func init() {
	AppMapCache = cmap.New[*ttlcache.Cache[string, string]]()
	AppSubMapCache = ttlcache.New[string, *ttlcache.Cache[string, string]]()
	go AppSubMapCache.Start()
}
func InitCache(OnEviction func(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string]),
	OnEvictionSub func(reason ttlcache.EvictionReason, item *ttlcache.Item[string, string])) {
	CmdOnEviction = OnEviction
	CmdOnEvictionSub = OnEvictionSub
}
func SetAppJob(key string, jobKey string, jobResultEndKey string, ttl time.Duration) {
	// 尝试获取已存在的缓存
	cache, ok := AppMapCache.Get(key)
	if !ok {
		// 创建新的缓存
		cacheNew := ttlcache.New[string, string]()
		cacheNew.OnEviction(func(ctx context.Context, reason ttlcache.EvictionReason, item *ttlcache.Item[string, string]) {
			CmdOnEviction(reason, item)
		})
		go cacheNew.Start()
		// 使用SetIfAbsent确保只有一个被设置
		if AppMapCache.SetIfAbsent(key, cacheNew) {
			// 设置成功，使用新创建的缓存
			cacheNew.Set(jobKey, jobResultEndKey, ttl)
		}
	} else {
		cache.Set(jobKey, jobResultEndKey, ttl)
	}

	logger.Info("job cache set",
		zap.String("key", key),
		zap.String("jobKey", jobKey),
		zap.String("jobResultEndKey", jobResultEndKey),
		zap.Any("ttl", ttl),
	)
}

func GetAppJob(key string, jobKey string) string {
	get, b := AppMapCache.Get(key)
	if !b {
		logger.Error("AppMapCache.Get error")
		return ""
	}
	return get.Get(jobKey).Value()
}

func DelAppJob(key string, jobKey string) {
	get, b := AppMapCache.Get(key)
	if !b {
		logger.Error("AppMapCache.Get error")
		return
	}
	get.Delete(jobKey)
	logger.Info("job cache del",
		zap.String("key", key),
		zap.String("jobKey", jobKey),
	)
}
func HasAppJob(key string, jobKey string) bool {
	get, b := AppMapCache.Get(key)
	if !b {
		logger.Error("AppMapCache.Get error")
		return false
	}
	return get.Has(jobKey)
}

func Set(jobKey string, value string, ttl time.Duration) {
	SetAppJob(topic.AppJobByKey(jobKey), jobKey, value, ttl)
}

func Get(jobKey string) string {
	return GetAppJob(topic.AppJobByKey(jobKey), jobKey)
}

func Del(jobKey string) {
	DelAppJob(topic.AppJobByKey(jobKey), jobKey)
}

func Has(jobKey string) bool {
	return HasAppJob(topic.AppJobByKey(jobKey), jobKey)
}

func CountByJobKey(jobKey string) int {
	get, b := AppMapCache.Get(topic.AppJobByKey(jobKey))
	if !b {
		return 0
	}
	return get.Len()
}

func Count(key string) int {
	get, b := AppMapCache.Get(key)
	if !b {
		return 0
	}
	return get.Len()
}

// 子任务客户端缓存
func SetSub(jobKey string, value string, createdAt string, ttl time.Duration) {
	key := topic.TaskIdByKey(jobKey)
	get := AppSubMapCache.Get(key)
	if get != nil {
		get.Value().Set(value, createdAt, ttl)
	} else {
		cacheNew := ttlcache.New[string, string]()
		cacheNew.OnEviction(func(ctx context.Context, reason ttlcache.EvictionReason, item *ttlcache.Item[string, string]) {
			CmdOnEvictionSub(reason, item)
		})
		go cacheNew.Start()
		cacheNew.Set(value, createdAt, ttl)
		//多增加1秒 避免缓存数据未过期时 被删除
		AppSubMapCache.Set(key, cacheNew, ttl+10*time.Second)
	}
	logger.Info("set app sub cache",
		zap.String("key", key),
		zap.String("value", value),
		zap.String("createdAt", createdAt),
		zap.Any("ttl", ttl),
		zap.Any("ttl2", ttl+10*time.Second),
		zap.Any("AppSubMapCacheCount", AppSubMapCache.Len()),
	)
}

// 删除子任务客户端缓存
func DelSub(jobKey string, value string) {
	key := topic.TaskIdByKey(jobKey)
	get := AppSubMapCache.Get(key)
	if get != nil {
		get.Value().Delete(value)
		logger.Info("job cache del sub",
			zap.String("key", key),
			zap.String("value", value),
		)
	}
}

// 获取子任务客户端缓存数量
func CountSub(jobKey string) int {
	key := topic.TaskIdByKey(jobKey)
	get := AppSubMapCache.Get(key)
	if get != nil {
		return get.Value().Len()
	}
	return 0
}

func GetAppMapCount() (int, int) {
	total := AppMapCache.Count()
	if total == 0 {
		return 0, 0
	}

	//所有value数量
	valueCount := 0
	AppMapCache.IterCb(func(key string, value *ttlcache.Cache[string, string]) {
		valueCount += value.Len()
	})

	//子任务数
	subCount := AppSubMapCache.Len()
	return valueCount, subCount
}
