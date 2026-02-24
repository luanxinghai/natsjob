package enums

import cmap "github.com/orcaman/concurrent-map/v2"

// 针对所有APP信息
type AppJob struct {
	AppName   string
	JobName   string
	ClientMap cmap.ConcurrentMap[string, string] //客户端在线心跳的map
}
