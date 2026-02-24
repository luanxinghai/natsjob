package server_reg

import (
	"natsjob/config"
	"natsjob/global"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/natsclient"
	"natsjob/internal/core/topic"
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/json"
	"natsjob/pkg/sysutil"
	"time"

	cmap "github.com/orcaman/concurrent-map/v2"
	"go.uber.org/zap"
)

type ServerReg struct {
	ID         string              `json:"id"`
	Namespace  string              `json:"namespace"`
	StartTime  time.Time           `json:"startTime"`
	UpdateTime time.Time           `json:"updateTime"`
	SystemInfo *sysutil.SystemInfo `json:"systemInfo"`
}

type ServerRegVo struct {
	ID          string              `json:"id"`
	Namespace   string              `json:"namespace"`
	StartTime   string              `json:"startTime"`
	UpdateTime  string              `json:"updateTime"`
	IsMaster    bool                `json:"isMaster"`
	SystemInfo  *sysutil.SystemInfo `json:"systemInfo"`
	NatsConnect bool                `json:"natsConnect"`
}

type ServerRegManager struct {
	serverMap     cmap.ConcurrentMap[string, *ServerReg]
	serverReg     *ServerReg
	NatsClient    *enums.NatsClient
	IsMaster      bool
	MasterId      string
	MasterChanged func(isMaster bool) // 添加回调函数字段
}

func NewServerReg(natsClient *enums.NatsClient) *ServerRegManager {
	var id = ids.UUIDNewV7Compact()
	//考虑将id写入本地 文件， 重启后从文件读取id
	id = getLocalFileKeyId(id)
	return &ServerRegManager{
		serverMap: cmap.New[*ServerReg](),
		serverReg: &ServerReg{
			ID:         id,
			Namespace:  config.EnvParam.NameSpace,
			StartTime:  time.Now(),
			UpdateTime: time.Now(),
			SystemInfo: sysutil.GetSystemInfo(),
		},
		IsMaster:      false,
		MasterChanged: nil,
		NatsClient:    natsClient,
	}
}

func (c *ServerRegManager) ServerRegHeartbeat() {
	if c.NatsClient.Connected.Load() == false {
		logger.Error("server reg skip, nats not connected")
		return
	}

	c.serverReg.UpdateTime = time.Now()
	c.serverReg.Namespace = config.EnvParam.NameSpace
	if c.serverReg.Namespace == "" {
		c.serverReg.Namespace = global.Namespace
	}

	//抢夺锁
	c.SetMaster()
	if c.MasterChanged != nil {
		c.MasterChanged(c.IsMaster)
	}

	//设置心跳
	kv, err := natsclient.KeyValue(topic.KV_BUCKET.Heartbeat)
	if err != nil {
		logger.Error("server reg failed", zap.String("kvBucket", topic.KV_BUCKET.Heartbeat), zap.Error(err))
		return
	}

	//更新系统信息
	c.serverReg.SystemInfo = sysutil.GetSystemInfo()
	//设置心跳
	msg := json.MustMarshal(c.serverReg)
	key := topic.HeartbeatServerKey(c.serverReg.Namespace, c.serverReg.ID)
	logger.Info("server reg", zap.String("key", key), zap.Any("serverReg", c.serverReg))
	_, err = kv.Put(key, []byte(msg))
	if err != nil {
		logger.Error("server reg failed", zap.String("key", key), zap.Any("serverReg", c.serverReg), zap.Error(err))
	}
}

/*
*
尝试抢锁
*/
func (c *ServerRegManager) SetMaster() {
	kv, err := natsclient.KeyValue(topic.KV_BUCKET.ServerLB)
	if err != nil {
		logger.Error("server set master failed", zap.String("kvBucket", topic.KV_BUCKET.ServerLB), zap.Error(err))
		return
	}

	//如果是master 就进行续期
	masterKey := topic.MasterServerKey(c.serverReg.Namespace)
	if c.IsMaster {
		c.MasterId = c.serverReg.ID
		_, err = kv.Put(masterKey, []byte(c.serverReg.ID))
		if err != nil {
			logger.Error("server set master failed", zap.String("key", masterKey), zap.Error(err))
		}
		return
	}

	//读取下现在master是否是自己,有可能刚停止服务又重启了
	entry, err := kv.Get(masterKey)
	if err == nil {
		c.MasterId = string(entry.Value())
		if c.MasterId == c.serverReg.ID {
			c.IsMaster = true
			return
		}
	}

	//尝试抢锁
	_, err = kv.Update(masterKey, []byte(c.serverReg.ID), 0)
	if err != nil {
		logger.Error("server set master failed", zap.String("key", masterKey), zap.Error(err))
		return
	}

	c.IsMaster = true
}

/*
*
获取master节点是否是当前节点
*/
func (c *ServerRegManager) Master() bool {
	return c.IsMaster
}

/*
*
重置master节点,与nats网络断开重连后,就重置重新选择主节点
*/
func (c *ServerRegManager) ResetMaster() {
	c.IsMaster = false
	c.Master()
}

func (c *ServerRegManager) SetServerReg(serverReg *ServerReg) {
	c.serverMap.Set(serverReg.ID, serverReg)
}

func (c *ServerRegManager) ResetExpired() {
	appsToCheck := make(map[string][]string)
	c.serverMap.IterCb(func(id string, reg *ServerReg) {
		if time.Now().Sub(reg.UpdateTime) > time.Second*30 {
			appsToCheck[id] = append(appsToCheck[id], "")
		}
	})

	for id, _ := range appsToCheck {
		c.serverMap.Remove(id)
	}
}

func (c *ServerRegManager) GetServerReg() *[]ServerRegVo {
	var serverRegs []ServerRegVo
	c.serverMap.IterCb(func(id string, reg *ServerReg) {
		regVo := &ServerRegVo{
			ID:         reg.ID,
			Namespace:  reg.Namespace,
			StartTime:  datetime.DateTimeMs(reg.StartTime),
			UpdateTime: datetime.DateTimeMs(reg.UpdateTime),
			IsMaster:   c.MasterId == reg.ID,
			SystemInfo: reg.SystemInfo,
		}
		serverRegs = append(serverRegs, *regVo)
	})
	return &serverRegs
}

func (c *ServerRegManager) GetCurrentServerReg() *ServerRegVo {
	return &ServerRegVo{
		ID:         c.serverReg.ID,
		Namespace:  c.serverReg.Namespace,
		StartTime:  datetime.DateTimeMs(c.serverReg.StartTime),
		UpdateTime: datetime.DateTimeMs(c.serverReg.UpdateTime),
		IsMaster:   c.IsMaster,
		SystemInfo: c.serverReg.SystemInfo,
	}
}
