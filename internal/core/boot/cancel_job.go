package boot

import (
	"context"
	"errors"

	"natsjob/internal/core/cache"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/job_result_chan/job_result_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"natsjob/internal/core/topic"
	"natsjob/internal/database"
	"natsjob/logger"

	"go.uber.org/zap"
)

// CancelJob 取消运行中的任务
// 逻辑同任务过期 expired(参考 watch_cache_expired / job_expired):
//  1. 清理本地缓存任务,避免后续过期触发再次处理覆盖状态
//  2. 清理 NATS KV 中的 jobKey / jobEndKey
//  3. 将任务结果状态标记为 cancel
//
// 仅允许状态为 create(运行中)的任务取消
func CancelJob(id int64) error {
	q := database.GetQuery()
	result, err := q.NjAppJobResult.WithContext(context.Background()).
		Where(q.NjAppJobResult.ID.Eq(id)).
		First()
	if err != nil {
		logger.Error("cancel job query fail", zap.Int64("id", id), zap.Error(err))
		return errors.New("查询任务结果失败")
	}

	// 仅运行中(create)的任务允许取消
	if result.Status != enums.JOB_RESULT_STATUS.Create {
		return errors.New("任务状态不是运行中,无法取消")
	}

	jobTask := &enums.JobCron{
		Namespace: result.Namespace,
		AppName:   result.AppName,
		JobName:   result.JobName,
	}
	jobKey := topic.JobKey(jobTask, id)

	checkKVKeyValue()

	// 取得缓存中的结果结束key(可能是 pre-end 或 end)
	jobEndKey := cache.Get(jobKey)
	if jobEndKey == "" {
		// 缓存已失效,尝试直接构造 end key
		jobEndKey = topic.JobEndKey(jobTask, id)
	}

	// 清理缓存,避免后续过期触发再次处理覆盖状态
	cache.Del(jobKey)

	jobResultEndInfo := job_result_service.JobResultEndInfo{
		IsSuccess:     false,
		IsSuccessNext: false,
		IsFail:        true,
		IsErr:         false,
		Status:        enums.JOB_RESULT_STATUS.Cancel,
		Reason:        "任务已取消",
	}
	job_result_end.JobResultSuccessFail(jobEndKey, jobKeyKeyValue, jobResultsKeyValue, &jobResultEndInfo)
	return nil
}
