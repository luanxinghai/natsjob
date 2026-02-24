package appjob

import (
	"natsjob/internal/core/enums"
	"natsjob/pkg/strutil"
	"sync"

	cmap "github.com/orcaman/concurrent-map/v2"
)

type AppJobManager struct {
	AppMap    cmap.ConcurrentMap[string, string]
	AppJobMap cmap.ConcurrentMap[string, *enums.JobCron]
	mu        sync.RWMutex
}

/**
 * 定时任务管理器
 */
func NewAppJobManager() *AppJobManager {
	c := &AppJobManager{
		AppMap:    cmap.New[string](),
		AppJobMap: cmap.New[*enums.JobCron](),
	}
	return c
}

func (c *AppJobManager) HasApp(namespace string, appName string) bool {
	return c.AppMap.Has(strutil.JoinByDot(namespace, appName))
}

func (c *AppJobManager) SetAppJob(jobCron *enums.JobCron) {
	c.AppMap.Set(strutil.JoinByDot(jobCron.Namespace, jobCron.AppName), "")
	key := strutil.JoinByDot(jobCron.Namespace, jobCron.AppName, jobCron.JobName)
	c.AppJobMap.Set(key, jobCron)
}

func (c *AppJobManager) SetAppJobResetBatch(jobCron []*enums.JobCron) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.Clear()
	for _, job := range jobCron {
		c.SetAppJob(job)
	}
}

func (c *AppJobManager) RemoveAppJob(jobCron *enums.JobCron) {
	key := strutil.JoinByDot(jobCron.Namespace, jobCron.AppName, jobCron.JobName)
	c.AppJobMap.Remove(key)
}

func (c *AppJobManager) GetAppJobByKey(key string) (*enums.JobCron, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.AppJobMap.Get(key)
}

func (c *AppJobManager) GetAppJob(namespace string, appName string, jobName string) (*enums.JobCron, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	key := strutil.JoinByDot(namespace, appName, jobName)
	return c.AppJobMap.Get(key)
}

func (c *AppJobManager) GetCount() (int, int) {
	return c.AppMap.Count(), c.AppJobMap.Count()
}

func (c *AppJobManager) Clear() {
	c.AppMap.Clear()
	c.AppJobMap.Clear()
}
