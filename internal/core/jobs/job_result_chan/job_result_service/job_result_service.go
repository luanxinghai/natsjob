package job_result_service

import (
	"natsjob/internal/core/enums"
	"natsjob/logger"
	"natsjob/pkg/json"

	"go.uber.org/zap"
)

type RecJobResultEndMessage struct {
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
	ClientId       string `json:"clientId"`
}

type JobResultEndInfo struct {
	IsSuccess      bool   `json:"isSuccess"`
	IsSuccessNext  bool   `json:"isSuccessNext"`
	IsFail         bool   `json:"isFail"`
	IsErr          bool   `json:"isErr"`
	Status         string `json:"status"`
	Reason         string `json:"reason"`
	MonitorStatus  string `json:"monitorStatus"`
	MonitorPayload string `json:"monitorPayload"`
	ClientId       string `json:"clientId"`
}

func GetJobResultEndInfo(value string) JobResultEndInfo {
	if value == "" {
		return JobResultEndInfo{
			IsSuccess:     false,
			IsSuccessNext: false,
			IsFail:        false,
			IsErr:         true,
		}
	}
	//任务结束处理
	//如果传递是json
	var msg RecJobResultEndMessage
	if isStrResult(value) {
		msg = RecJobResultEndMessage{
			Status: value,
			Reason: "",
		}
	} else {
		err := json.UnmarshalStr(value, &msg)
		if err != nil {
			logger.Error("json.UnmarshalStr fail", zap.String("value", value), zap.Error(err))
		}
	}

	status := msg.Status
	if len(status) > 64 {
		status = status[0:64]
	}

	reason := msg.Reason
	if len(reason) > 1024 {
		reason = reason[0:1024]
	}

	monitorStatus := msg.MonitorStatus
	if len(monitorStatus) > 64 {
		monitorStatus = monitorStatus[0:64]
	}

	monitorPayload := msg.MonitorPayload
	if len(monitorPayload) > 1024 {
		monitorPayload = monitorPayload[0:1024]
	}

	clientId := msg.ClientId
	if len(clientId) > 64 {
		clientId = clientId[0:64]
	}

	return JobResultEndInfo{
		IsSuccess:      isSuccess(msg.Status),
		IsSuccessNext:  isSuccessNext(msg.Status),
		IsFail:         isFail(msg.Status),
		IsErr:          isErr(msg.Status),
		Status:         status,
		Reason:         reason,
		MonitorStatus:  monitorStatus,
		MonitorPayload: monitorPayload,
		ClientId:       clientId,
	}
}

func isStrResult(status string) bool {
	return isSuccess(status) || isSuccessNext(status) || isFail(status) || isExpired(status)
}

func isSuccess(status string) bool {
	return status == enums.JOB_RESULT_STATUS.Success
}
func isSuccessNext(status string) bool {
	return status == enums.JOB_RESULT_STATUS.SuccessNext
}
func isExpired(status string) bool {
	return status == enums.JOB_RESULT_STATUS.Expired
}

func isFail(status string) bool {
	return status == enums.JOB_RESULT_STATUS.Fail
}

func isErr(status string) bool {
	return status != enums.JOB_RESULT_STATUS.Success &&
		status != enums.JOB_RESULT_STATUS.SuccessNext &&
		status != enums.JOB_RESULT_STATUS.Fail &&
		status != enums.JOB_RESULT_STATUS.Expired
}
