package cronmgr

import (
	"natsjob/internal/core/enums"
	"natsjob/logger"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
	"go.uber.org/zap"
)

type CronManager struct {
	cron   *cron.Cron
	jobMap map[int64]*enums.JobCron
	mu     sync.RWMutex
}

/**
 * 获取默认的cron配置
 */
func (c *CronManager) defaultOptions() []cron.Option {
	return []cron.Option{
		cron.WithLocation(time.Local),
		cron.WithSeconds(),
		cron.WithChain(
			cron.Recover(cron.DefaultLogger),
		),
	}
}

/**
 * 定时任务管理器
 */
func NewCronManager() *CronManager {
	c := &CronManager{
		jobMap: make(map[int64]*enums.JobCron),
	}
	c.cron = cron.New(c.defaultOptions()...)
	c.cron.Start()
	return c
}

/**
 * 添加定时任务
 */
func (c *CronManager) CreateJob(job *enums.JobCron) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.createJobTask(job)
}

func (c *CronManager) createJobTask(job *enums.JobCron) bool {
	if _, ok := c.jobMap[job.JobId]; ok {
		logger.Error("Cron job already exists", zap.Any("job", job))
		return false
	}

	entryID, err := c.cron.AddFunc(job.Cron, func() {
		if job.NatsClient.Connected.Load() == false {
			logger.Error("job publish message skip, nats not connected", zap.String("namespace", job.Namespace), zap.String("app", job.AppName), zap.String("job", job.JobName))
			return
		}
		job.JobCronCmd(job)
	})

	if err != nil {
		logger.Error("Cron job addition failed", zap.Any("job", job), zap.Error(err))
		return false
	}

	job.EntryID = entryID
	c.jobMap[job.JobId] = job
	logger.Info("Cron job added successfully", zap.Any("job", job), zap.Any("entryId", entryID))
	return true
}

/*
*
移除定时任务
*/
func (c *CronManager) RemoveJob(jobId int64) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.removeJobTask(jobId)
}

func (c *CronManager) removeJobTask(jobId int64) bool {
	if jobCron, exists := c.jobMap[jobId]; exists {
		c.cron.Remove(jobCron.EntryID)
		delete(c.jobMap, jobId)
		logger.Info("Cron job removed successfully",
			zap.Int("cronLen", len(c.cron.Entries())),
			zap.Int("jobMapLen", len(c.jobMap)),
			zap.Any("jobCron", jobCron))
		return true
	}
	logger.Error("Cron job removed fail job not found", zap.Int64("jobId", jobId))
	return false
}

/*
*
更新定时任务
*/
func (c *CronManager) UpdateJob(task *enums.JobCron) bool {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.removeJobTask(task.JobId)
	return c.createJobTask(task)
}

/*
*
只有cron变更才更新,如果不存在就新增
*/
func (c *CronManager) UpdateJobByCron(task *enums.JobCron) bool {
	c.mu.Lock()
	defer c.mu.Unlock()

	jobCron, exists := c.jobMap[task.JobId]
	if !exists {
		return c.createJobTask(task)
	}

	// cron没更新不触发变更
	if jobCron.Cron == task.Cron &&
		jobCron.JobArgs == task.JobArgs &&
		jobCron.MaxWorkers == task.MaxWorkers &&
		jobCron.TimeoutSeconds == task.TimeoutSeconds &&
		jobCron.JobCategory == task.JobCategory &&
		jobCron.JobModel == task.JobModel &&
		jobCron.AppName == task.AppName &&
		jobCron.JobName == task.JobName &&
		jobCron.Condition == task.Condition {
		return true
	}

	//如果cron有更新,则更新一些变量信息
	if jobCron.Cron == task.Cron {
		jobCron.JobCronCmd = task.JobCronCmd
		jobCron.MaxWorkers = task.MaxWorkers
		jobCron.TimeoutSeconds = task.TimeoutSeconds
		jobCron.JobCategory = task.JobCategory
		jobCron.JobModel = task.JobModel
		jobCron.AppName = task.AppName
		jobCron.JobName = task.JobName
		jobCron.Condition = task.Condition
		return true
	}

	c.removeJobTask(task.JobId)
	return c.createJobTask(task)
}

/*
*
停止所有定时任务
*/
func (c *CronManager) Stop() {
	c.cron.Stop()
}

/*
*
获取所有定时任务
*/
func (c *CronManager) GetEntries() []cron.Entry {
	return c.cron.Entries()
}

/*
*
获取指定任务
*/
func (c *CronManager) GetEntry(jobId int64) *cron.Entry {
	c.mu.RLock()
	defer c.mu.RUnlock()

	return c.getEntryTask(jobId)
}

func (c *CronManager) getEntryTask(jobId int64) *cron.Entry {
	if task, exists := c.jobMap[jobId]; exists {
		return new(c.cron.Entry(task.EntryID))
	}
	return nil
}

func (c *CronManager) ResetJobTask(jobMap map[int64]interface{}) {

	c.mu.Lock()
	defer c.mu.Unlock()

	// 检查 map 是否为 nil 或空
	if jobMap == nil || len(jobMap) == 0 {
		c.clearJob()
		return
	}

	// 收集需要删除的 keys
	var keysToDelete []int64
	for jobId := range c.jobMap {
		_, exists := jobMap[jobId]
		if !exists {
			keysToDelete = append(keysToDelete, jobId)
		}
	}

	// 统一删除
	for _, jobId := range keysToDelete {
		c.removeJobTask(jobId)
	}
}

/*
*
清空所有定时任务
*/
func (c *CronManager) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.clearJob()
}

func (c *CronManager) clearJob() {
	entries := c.cron.Entries()
	for _, entry := range entries {
		c.cron.Remove(entry.ID)
	}
	clear(c.jobMap)
	logger.Info("Cron job cleared successfully", zap.Int("cronLen", len(c.cron.Entries())), zap.Int("jobMapLen", len(c.jobMap)))
}

func (c *CronManager) GetJobCron(jobId int64) *enums.JobCron {
	return c.jobMap[jobId]
}
