package task_service

import (
	"natsjob/internal/core/enums"
	"natsjob/pkg/datetime"
	"natsjob/pkg/strutil"
	"time"
)

var JobMonitor func(appJobMonitorInfo *enums.AppJobMonitorInfo)

func JobMonitorByTask(appJobResultInfo *enums.AppJobResultInfo) {
	if appJobResultInfo.MonitorStatus != "" {
		appJobMonitorInfo := &enums.AppJobMonitorInfo{
			TaskID:         strutil.ToStr(appJobResultInfo.ID),
			SubTaskId:      "",
			Namespace:      appJobResultInfo.Namespace,
			AppName:        appJobResultInfo.AppName,
			JobName:        appJobResultInfo.JobName,
			Status:         appJobResultInfo.Status,
			Reason:         appJobResultInfo.Reason,
			MonitorStatus:  appJobResultInfo.MonitorStatus,
			MonitorPayload: appJobResultInfo.MonitorPayload,
			CreateAt:       appJobResultInfo.CreateAt,
		}
		JobMonitor(appJobMonitorInfo)
	}
}

func JobMonitorBySubTask(jobSubFlowMessage *JobSubFlowMessage, id int64, startTime *time.Time) {
	if jobSubFlowMessage.MonitorStatus != "" {
		JobMonitor(&enums.AppJobMonitorInfo{
			TaskID:         jobSubFlowMessage.TaskId.ToString(),
			SubTaskId:      strutil.ToStr(id),
			Namespace:      jobSubFlowMessage.Namespace,
			AppName:        jobSubFlowMessage.AppName,
			JobName:        jobSubFlowMessage.JobName,
			Status:         jobSubFlowMessage.Status,
			Reason:         jobSubFlowMessage.Reason,
			MonitorStatus:  jobSubFlowMessage.MonitorStatus,
			MonitorPayload: jobSubFlowMessage.MonitorPayload,
			CreateAt:       datetime.DateTimeNil(startTime),
		})
	}
}
