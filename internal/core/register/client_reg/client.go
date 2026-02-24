package client_reg

import (
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/strutil"
	"strings"
	"time"

	cmap "github.com/orcaman/concurrent-map/v2"
	"go.uber.org/zap"
)

type ClientReg struct {
	ID                 string    `json:"id"`
	Namespace          string    `json:"namespace"`
	AppName            string    `json:"appName"`
	Ip                 string    `json:"ip"`
	Comment            string    `json:"comment"`
	StartTime          time.Time `json:"startTime"`
	UpdateTime         time.Time `json:"updateTime"`
	Weight             int       `json:"weight"`
	MachineCPUUsage    string    `json:"machineCpuUsage"`
	MachineMemoryUsage string    `json:"machineMemoryUsage"`
	ProcessCPUUsage    string    `json:"processCpuUsage"`
	ProcessMemoryRSS   string    `json:"processMemoryRss"`
}

type ClientRegVo struct {
	ID                 string `json:"id"`
	Namespace          string `json:"namespace"`
	AppName            string `json:"appName"`
	Ip                 string `json:"ip"`
	Comment            string `json:"comment"`
	StartTime          string `json:"startTime"`
	UpdateTime         string `json:"updateTime"`
	Weight             int    `json:"weight"`
	MachineCPUUsage    string `json:"machineCpuUsage"`
	MachineMemoryUsage string `json:"machineMemoryUsage"`
	ProcessCPUUsage    string `json:"processCpuUsage"`
	ProcessMemoryRSS   string `json:"processMemoryRss"`
}
type ClientRegNsVo struct {
	Namespace  string         `json:"namespace"`
	AppName    string         `json:"appName"`
	ClientRegs []*ClientRegVo `json:"clientRegs"`
}
type ClientRegManager struct {
	clientMap cmap.ConcurrentMap[string, cmap.ConcurrentMap[string, *ClientReg]]
}

func NewClientReg() *ClientRegManager {
	return &ClientRegManager{
		clientMap: cmap.New[cmap.ConcurrentMap[string, *ClientReg]](),
	}
}

func (c *ClientRegManager) SetAppClient(clientReg *ClientReg) {
	nsAppName := strutil.JoinByDot(clientReg.Namespace, clientReg.AppName)
	get, b := c.clientMap.Get(nsAppName)
	if !b {
		get = cmap.New[*ClientReg]()
		c.clientMap.SetIfAbsent(nsAppName, get)
	}

	reg, b2 := get.Get(clientReg.ID)
	if b2 {
		clientReg.StartTime = reg.StartTime
	} else {
		clientReg.StartTime = time.Now()
	}

	get.Set(clientReg.ID, clientReg)
}

func (c *ClientRegManager) RemoveAppClient(nsAppName string, clientID string) {
	if appMap, ok := c.clientMap.Get(nsAppName); ok {
		appMap.Remove(clientID)
	}

}

func (c *ClientRegManager) ClientRegCount(namespace string, appName string) int {
	nsAppName := strutil.JoinByDot(namespace, appName)
	return c.ClientRegCountPlus(nsAppName)
}

func (c *ClientRegManager) ClientRegCountPlus(nsAppName string) int {
	if appMap, ok := c.clientMap.Get(nsAppName); ok {
		return appMap.Count()
	}
	return 0
}

func (c *ClientRegManager) GetClientReg(namespace string, appName string) *cmap.ConcurrentMap[string, *ClientReg] {
	nsAppName := strutil.JoinByDot(namespace, appName)
	if appMap, ok := c.clientMap.Get(nsAppName); ok {
		//过滤 weight>0的注册客户端: weight=0 说明客户端负载过高,不在被调度
		var filteredMap = cmap.New[*ClientReg]()
		appMap.IterCb(func(clientID string, reg *ClientReg) {
			if reg.Weight > 0 {
				filteredMap.Set(clientID, reg)
			}
		})
		return &filteredMap
	}
	return nil
}

func (c *ClientRegManager) GetClientRegMaxWeight(namespace string, appName string) string {
	nsAppName := strutil.JoinByDot(namespace, appName)
	if appMap, ok := c.clientMap.Get(nsAppName); ok {
		maxWeight := -1
		maxWeightClientID := ""

		// 遍历客户端，找出权重最大的客户端 ID
		appMap.IterCb(func(clientID string, reg *ClientReg) {
			if reg.Weight > maxWeight {
				maxWeight = reg.Weight
				maxWeightClientID = clientID
			}
		})

		// 返回最大权重的客户端 ID，如果没有则返回空字符串
		return maxWeightClientID
	}
	return ""
}

func (c *ClientRegManager) ResetExpired() {
	appsToCheck := make(map[string][]string) // nsAppName -> []clientIDs to remove
	c.clientMap.IterCb(func(nsAppName string, get cmap.ConcurrentMap[string, *ClientReg]) {
		var expiredClients []string
		get.IterCb(func(clientID string, reg *ClientReg) {
			if reg.UpdateTime.Add(30 * time.Second).Before(time.Now()) {
				expiredClients = append(expiredClients, clientID)
			}
		})
		if len(expiredClients) > 0 {
			appsToCheck[nsAppName] = expiredClients
		}
	})
	// 在锁外处理删除操作
	for nsAppName, clientIDs := range appsToCheck {
		for _, clientID := range clientIDs {
			c.RemoveAppClient(nsAppName, clientID) // 复用已有的安全删除方法
			logger.Info("remove expired client reg",
				zap.String("nsAppName", nsAppName),
				zap.String("clientID", clientID))
		}

		// 如果客户端注册没了,也移除掉
		if c.ClientRegCountPlus(nsAppName) == 0 {
			c.clientMap.Remove(nsAppName)
		}
	}
}

// 获取指定命名空间下的所有客户端注册
func (c *ClientRegManager) GetNsClientReg(namespace string) []*ClientRegNsVo {
	if c.clientMap.Count() == 0 {
		return nil
	}

	clientRegInfos := make([]*ClientRegNsVo, 0)
	nsPrefix := strutil.JoinByDot(namespace)
	c.clientMap.IterCb(func(nsAppName string, get cmap.ConcurrentMap[string, *ClientReg]) {
		if strings.HasPrefix(nsAppName, nsPrefix) {
			clientRegs := make([]*ClientRegVo, 0)
			get.IterCb(func(clientID string, reg *ClientReg) {
				clientRegs = append(clientRegs, c.toVo(reg))
			})

			clientRegInfo := &ClientRegNsVo{
				Namespace:  namespace,
				AppName:    strings.TrimPrefix(nsAppName, nsPrefix+"."),
				ClientRegs: clientRegs,
			}
			clientRegInfos = append(clientRegInfos, clientRegInfo)
		}
	})

	return clientRegInfos
}

func (c *ClientRegManager) GetNsClientRegApp(namespace string, appName string) []*ClientRegVo {
	if c.clientMap.Count() == 0 {
		return nil
	}
	clientRegInfos := make([]*ClientRegVo, 0)
	nsAppName := strutil.JoinByDot(namespace, appName)
	if appMap, ok := c.clientMap.Get(nsAppName); ok {
		appMap.IterCb(func(clientID string, reg *ClientReg) {
			clientRegInfos = append(clientRegInfos, c.toVo(reg))
		})
	}
	return clientRegInfos
}

func (c *ClientRegManager) toVo(reg *ClientReg) *ClientRegVo {
	return &ClientRegVo{
		ID:                 reg.ID,
		Namespace:          reg.Namespace,
		AppName:            reg.AppName,
		Ip:                 reg.Ip,
		Comment:            reg.Comment,
		StartTime:          datetime.DateTimeMs(reg.StartTime),
		UpdateTime:         datetime.DateTimeMs(reg.UpdateTime),
		Weight:             reg.Weight,
		MachineCPUUsage:    reg.MachineCPUUsage,
		MachineMemoryUsage: reg.MachineMemoryUsage,
		ProcessCPUUsage:    reg.ProcessCPUUsage,
		ProcessMemoryRSS:   reg.ProcessMemoryRSS,
	}
}
