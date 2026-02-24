package task_service

import (
	"context"
	"natsjob/config"
	"natsjob/internal/core/enums"
	"natsjob/internal/dao/query"
	"natsjob/internal/database"
	"natsjob/internal/model"
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/json"
	"time"

	"go.uber.org/zap"
)

func CreateJob(job *enums.JobCron, message *enums.JobMessage) {
	q := query.Use(database.DB)

	pubMessage := message.JobPubMessage
	err := q.NjAppJobResult.WithContext(context.Background()).
		Create(
			&model.NjAppJobResult{
				ID:          message.TaskId,
				AppID:       job.AppId,
				AppName:     job.AppName,
				JobId:       message.JobId,
				JobName:     job.JobName,
				Namespace:   job.Namespace,
				NamespaceId: job.NamespaceId,
				Category:    job.JobCategory,
				Model:       job.JobModel,
				ExpiredAt:   datetime.ParseDateTimeOrNil(pubMessage.JobExpireTime),
				StartAt:     datetime.ParseDateTimeOrNil(pubMessage.JobCreatedAt),
				EndAt:       nil,
				Status:      enums.JOB_RESULT_STATUS.Create,
				Reason:      "",
			},
		)
	if err != nil {
		logger.Error("create job result error", zap.Error(err))
	}

}

func CreateJobSub(job *enums.JobCron, message *enums.JobMessage, idKey int64, clientId string) {
	q := query.Use(database.DB)

	startTime := time.Now()
	err := q.NjAppJobSubResult.WithContext(context.Background()).
		Create(
			&model.NjAppJobSubResult{
				ID:          idKey,
				ParentID:    message.TaskId,
				AppID:       job.AppId,
				AppName:     job.AppName,
				JobId:       message.JobId,
				JobName:     job.JobName,
				Namespace:   job.Namespace,
				NamespaceId: job.NamespaceId,
				Category:    job.JobCategory,
				Model:       job.JobModel,
				ClientID:    clientId,
				SceneID:     enums.JOB_SCENE.SYS,
				SceneName:   "",
				StartAt:     &startTime,
				EndAt:       nil,
				Status:      enums.JOB_RESULT_STATUS.Create,
				Reason:      "",
			},
		)
	if err != nil {
		logger.Error("create job sub result error", zap.Error(err))
	}

}

func UpdateJob(appJobResultInfo *enums.AppJobResultInfo) {
	q := query.Use(database.DB)

	var timeSpan int64 = 0
	var entTime time.Time
	if appJobResultInfo.ExpireEndTime != (time.Time{}) {
		entTime = appJobResultInfo.ExpireEndTime
	} else {
		entTime = time.Now()
	}
	createAtNil := datetime.ParseDateTimeOrNil(appJobResultInfo.CreateAt)
	if createAtNil != nil {
		timeSpan = entTime.Sub(*createAtNil).Milliseconds()
	}

	_, err := q.NjAppJobResult.WithContext(context.Background()).
		Where(q.NjAppJobResult.ID.Eq(appJobResultInfo.ID)).
		Updates(&model.NjAppJobResult{
			Status:         appJobResultInfo.Status,
			Reason:         appJobResultInfo.Reason,
			MonitorStatus:  appJobResultInfo.MonitorStatus,
			MonitorPayload: appJobResultInfo.MonitorPayload,
			EndAt:          &entTime,
			TimeSpan:       timeSpan,
		})

	if err != nil {
		logger.Error("update job result error", zap.Error(err))
	}

	JobMonitorByTask(appJobResultInfo)
}

func UpdateSubJob(appJobResultInfo *enums.AppJobResultInfo, idKey int64) {
	q := query.Use(database.DB)

	var timeSpan int64 = 0
	var entTime time.Time
	if appJobResultInfo.ExpireEndTime != (time.Time{}) {
		entTime = appJobResultInfo.ExpireEndTime
	} else {
		entTime = time.Now()
	}
	createAtNil := datetime.ParseDateTimeOrNil(appJobResultInfo.CreateAt)
	if createAtNil != nil {
		timeSpan = entTime.Sub(*createAtNil).Milliseconds()
	}
	_, err := q.NjAppJobSubResult.WithContext(context.Background()).
		Where(q.NjAppJobSubResult.ID.Eq(idKey)).
		Updates(&model.NjAppJobSubResult{
			Status:   appJobResultInfo.Status,
			Reason:   appJobResultInfo.Reason,
			EndAt:    &entTime,
			TimeSpan: timeSpan,
		})

	if err != nil {
		logger.Error("update job result error", zap.Error(err))
	}

	JobMonitorByTask(appJobResultInfo)
}

func CreateSubFlow(jsonData string) {
	if jsonData == "" {
		return
	}

	jobSubFlowMessage := &JobSubFlowMessage{}
	err := json.Unmarshal([]byte(jsonData), jobSubFlowMessage)
	if err != nil {
		logger.Error("unmarshal job trace message error", zap.Error(err))
		return
	}
	//计算开始时间处理
	startTime := datetime.ParseDateTimeOrNil(jobSubFlowMessage.StartAt.ToString())
	endTime := datetime.ParseDateTimeOrNil(jobSubFlowMessage.EndAt.ToString())
	var timeSpan int64 = 0
	if startTime != nil && endTime != nil {
		timeSpan = endTime.Sub(*startTime).Milliseconds()
	}
	id := ids.Id()
	q := database.GetQuery()
	err2 := q.NjAppJobSubResult.WithContext(context.Background()).
		Create(
			&model.NjAppJobSubResult{
				ID:             id,
				ParentID:       jobSubFlowMessage.TaskId.ToInt64(),
				Namespace:      jobSubFlowMessage.Namespace,
				AppName:        jobSubFlowMessage.AppName,
				JobName:        jobSubFlowMessage.JobName,
				ClientID:       jobSubFlowMessage.ClientId,
				SceneID:        jobSubFlowMessage.SceneId,
				SceneName:      jobSubFlowMessage.SceneName,
				Status:         jobSubFlowMessage.Status,
				Reason:         jobSubFlowMessage.Reason,
				MonitorStatus:  jobSubFlowMessage.MonitorStatus,
				MonitorPayload: jobSubFlowMessage.MonitorPayload,
				StartAt:        startTime,
				EndAt:          endTime,
				TimeSpan:       timeSpan,
			},
		)
	if err2 != nil {
		logger.Error("create job sub result error", zap.Error(err2))
	}

	JobMonitorBySubTask(jobSubFlowMessage, id, startTime)
}

// 清理超过7天的结果数据
func CleanExpiredResults() {
	q := query.Use(database.DB)
	//计算出7天前的最小ID,根据id删除速度更快
	minId := ids.IdAgoHourMin(config.EnvParam.JobResultExpireHours)
	_, err := q.NjAppJobResult.WithContext(context.Background()).
		Where(q.NjAppJobResult.ID.Lt(minId)).
		Delete()
	if err != nil {
		logger.Error("clean job results failed", zap.Error(err))
	}
	logger.Info("clean job results success", zap.Int64("minId", minId))
}

// 清理超过7天的子结果数据
func CleanExpiredSubResults() {
	q := query.Use(database.DB)
	//计算出7天前的最小ID,根据id删除速度更快
	minId := ids.IdAgoHourMin(config.EnvParam.JobResultExpireHours)
	_, err := q.NjAppJobSubResult.WithContext(context.Background()).
		Where(q.NjAppJobSubResult.ID.Lt(minId)).
		Delete()
	if err != nil {
		logger.Error("clean job sub results failed", zap.Error(err))
	}
	logger.Info("clean job sub results success", zap.Int64("minId", minId))
}
