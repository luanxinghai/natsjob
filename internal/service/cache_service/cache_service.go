package cache_service

import (
	"natsjob/internal/core/boot"
	"natsjob/internal/core/cache"
	"natsjob/internal/pojo"
	"natsjob/pkg/web/resp"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CacheStat(c *gin.Context) {
	appCount, jobCount := boot.AppJobMap.GetCount()
	valueCount, subCount := cache.GetAppMapCount()
	CacheStatVo := pojo.CacheStatVo{
		AppTotal:    strconv.Itoa(appCount),
		JobTotal:    strconv.Itoa(jobCount),
		ValuesTotal: strconv.Itoa(valueCount),
		SubTotal:    strconv.Itoa(subCount),
		DbChanTotal: strconv.Itoa(len(boot.DBChanSemaphore)),
	}
	resp.OK(c, CacheStatVo)
}
