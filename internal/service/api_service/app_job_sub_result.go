package api_service

import (
	"natsjob/internal/database"
	"natsjob/internal/pojo"
	"natsjob/internal/service/valid"
	"natsjob/pkg/datetime"
	"natsjob/pkg/strutil"
	"natsjob/pkg/web/page"
	"natsjob/pkg/web/resp"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func AppJobSubResultList(c *gin.Context) {
	queryDto := pojo.AppJobSubResultQuery{
		Pagination: page.Pagination{
			Current: 1,
			Size:    10,
		},
	}
	if err := c.ShouldBind(&queryDto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, queryDto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	taskId, err := strutil.ToInt64(queryDto.TaskId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	query := q.NjAppJobSubResult.WithContext(c).
		Where(q.NjAppJobSubResult.ParentID.Eq(taskId))

	if queryDto.Status != "" {
		query = query.Where(q.NjAppJobSubResult.Status.Eq(queryDto.Status))
	}
	if queryDto.Reason != "" {
		query = query.Where(q.NjAppJobSubResult.Reason.Like("%" + queryDto.Reason + "%"))
	}
	if queryDto.MonitorStatus != "" {
		query = query.Where(q.NjAppJobSubResult.MonitorStatus.Eq(queryDto.MonitorStatus))
	}
	if queryDto.MonitorPayload != "" {
		query = query.Where(q.NjAppJobSubResult.MonitorPayload.Like("%" + queryDto.MonitorPayload + "%"))
	}

	result, count, err := query.Order(q.NjAppJobSubResult.ID.Asc()).
		FindByPage(queryDto.GetOffset(), queryDto.GetSize())
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//将result转换为vo
	var resultVo []pojo.AppJobSubResultVo
	for _, v := range result {
		resultVo = append(resultVo, pojo.AppJobSubResultVo{
			ID:             strutil.ToStr(v.ID),
			ParentID:       strutil.ToStr(v.ParentID),
			ClientID:       v.ClientID,
			SceneID:        v.SceneID,
			SceneName:      v.SceneName,
			NamespaceId:    strutil.ToStr(v.NamespaceId),
			Namespace:      v.Namespace,
			AppID:          strutil.ToStr(v.AppID),
			AppName:        v.AppName,
			JobId:          strutil.ToStr(v.JobId),
			JobName:        v.JobName,
			Category:       v.Category,
			Model:          v.Model,
			Status:         v.Status,
			Reason:         v.Reason,
			MonitorStatus:  v.MonitorStatus,
			MonitorPayload: v.MonitorPayload,
			TimeSpan:       strutil.ToStr(v.TimeSpan),
			StartAt:        datetime.DateTimeMsNil(v.StartAt),
			EndAt:          datetime.DateTimeMsNil(v.EndAt),
			CreatedAt:      datetime.DateTime(v.CreatedAt),
			UpdatedAt:      datetime.DateTime(v.UpdatedAt),
		})
	}

	resp.OK(c, page.PageResult{
		List:    resultVo,
		Total:   count,
		Current: queryDto.GetCurrent(),
		Size:    queryDto.GetSize(),
	})
}
