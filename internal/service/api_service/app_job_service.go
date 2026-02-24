package api_service

import (
	"context"
	"natsjob/internal/core/boot"
	"natsjob/internal/database"
	"natsjob/internal/model"
	"natsjob/internal/pojo"
	"natsjob/internal/service/valid"
	"natsjob/logger"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/strutil"
	"natsjob/pkg/web/page"
	"natsjob/pkg/web/resp"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/robfig/cron/v3"
	"go.uber.org/zap"
	"gorm.io/gen/field"
)

func AppJobList(c *gin.Context) {
	queryDto := pojo.AppJobQuery{
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

	appId, err := strutil.ToInt64(queryDto.AppId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	query := q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Where(q.NjAppJob.AppId.Eq(appId))

	if queryDto.Name != "" {
		query.Where(q.NjAppJob.Name.Like("%" + queryDto.Name + "%"))
	}
	if queryDto.Status != nil {
		status := queryDto.Status
		query = query.Where(q.NjAppJob.Status.Eq(*status))
	}
	if queryDto.Category != "" {
		query = query.Where(q.NjAppJob.Category.Eq(queryDto.Category))
	}
	if queryDto.Model != "" {
		query = query.Where(q.NjAppJob.Model.Eq(queryDto.Model))
	}

	result, count, err := query.Order(q.NjAppJob.ID.Desc()).
		FindByPage(queryDto.GetOffset(), queryDto.GetSize())
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//将result转换为vo
	var resultVo []pojo.AppJobVo
	for _, v := range result {
		vo := getVo(v)
		resultVo = append(resultVo, *vo)
	}

	resp.OK(c, page.PageResult{
		List:    resultVo,
		Total:   count,
		Current: queryDto.GetCurrent(),
		Size:    queryDto.GetSize(),
	})
}

func AppJobCreate(c *gin.Context) {
	dto := pojo.AppJobDto{}
	if err := c.ShouldBindJSON(&dto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, dto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	appId, err := strutil.ToInt64(dto.AppId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	namespaceId, err := strutil.ToInt64(dto.NamespaceId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//如果存在 抛异常,不存在创建
	_, err = q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.Name.Eq(dto.Name)).
		Where(q.NjAppJob.AppId.Eq(appId)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		First()
	if err == nil {
		// 记录存在，抛异常
		resp.Error(c, "AppJob already exists")
		return
	}

	_, err = checkCron(dto.Cron)
	if err != nil {
		resp.Error(c, "Cron expression is invalid,"+err.Error())
		return
	}

	id := ids.Id()
	newAppJob := &model.NjAppJob{
		ID:             id,
		Name:           dto.Name,
		Description:    dto.Description,
		AppId:          appId,
		NamespaceId:    namespaceId,
		Cron:           dto.Cron,
		Category:       dto.Category,
		Model:          dto.Model,
		Status:         dto.Status,
		Condition:      dto.Condition,
		MaxWorkers:     dto.MaxWorkers,
		TimeoutSeconds: dto.TimeoutSeconds,
		Args:           dto.Args,
		StartAt:        datetime.ParseDateTimeOrNil(dto.StartAt),
		EndAt:          datetime.ParseDateTimeOrNil(dto.EndAt),
	}
	err = q.NjAppJob.WithContext(c).
		Create(newAppJob)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//添加到定时任务
	//添加到定时任务
	if dto.Status == 0 {
		boot.RunAppJobTaskCreateUpdateById(id)
	} else {
		boot.RunAppJobTaskRemoveById(id)
	}

	resp.OK(c, gin.H{"id": strutil.ToStr(newAppJob.ID)})
}

func AppJobUpdate(c *gin.Context) {
	dto := pojo.AppJobUpdateDto{}
	if err := c.ShouldBindJSON(&dto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, dto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	id, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	appId, err := strutil.ToInt64(dto.AppId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//如果存在 抛异常,不存在创建
	_, err = q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.ID.Neq(id)).
		Where(q.NjAppJob.Name.Eq(dto.Name)).
		Where(q.NjAppJob.AppId.Eq(appId)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		First()
	if err == nil {
		// 记录存在，抛异常
		resp.Error(c, "AppJob already exists")
		return
	}

	_, err = checkCron(dto.Cron)
	if err != nil {
		resp.Error(c, "Cron expression is invalid,"+err.Error())
		return
	}

	newAppJob := &model.NjAppJob{
		ID:             id,
		Name:           dto.Name,
		Description:    dto.Description,
		AppId:          appId,
		Cron:           dto.Cron,
		Category:       dto.Category,
		Model:          dto.Model,
		Status:         dto.Status,
		Condition:      dto.Condition,
		MaxWorkers:     dto.MaxWorkers,
		TimeoutSeconds: dto.TimeoutSeconds,
		Args:           dto.Args,
		StartAt:        datetime.ParseDateTimeOrNil(dto.StartAt),
		EndAt:          datetime.ParseDateTimeOrNil(dto.EndAt),
	}

	updateFields := make([]field.Expr, 0)
	updateFields = append(updateFields, q.NjAppJob.Name)
	updateFields = append(updateFields, q.NjAppJob.AppId)
	updateFields = append(updateFields, q.NjAppJob.Cron)
	updateFields = append(updateFields, q.NjAppJob.Description)
	updateFields = append(updateFields, q.NjAppJob.Args)
	updateFields = append(updateFields, q.NjAppJob.Category)
	updateFields = append(updateFields, q.NjAppJob.Model)
	updateFields = append(updateFields, q.NjAppJob.Status)
	updateFields = append(updateFields, q.NjAppJob.Condition)
	updateFields = append(updateFields, q.NjAppJob.MaxWorkers)
	updateFields = append(updateFields, q.NjAppJob.TimeoutSeconds)
	updateFields = append(updateFields, q.NjAppJob.StartAt)
	updateFields = append(updateFields, q.NjAppJob.EndAt)

	_, err = q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.ID.Eq(id)).
		Select(updateFields...).
		Updates(newAppJob)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//添加到定时任务
	if dto.Status == 0 {
		boot.RunAppJobTaskCreateUpdateById(id)
	} else {
		boot.RunAppJobTaskRemoveById(id)
	}

	resp.OK(c, true)
}

func checkCron(cronValue string) (cron.EntryID, error) {
	cron.WithSeconds()
	c := cron.New(cron.WithSeconds())
	return c.AddFunc(cronValue, func() {})
}

func AppJobGet(c *gin.Context) {
	dto := pojo.AppJobGetDto{}
	if err := c.ShouldBindJSON(&dto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, dto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	id, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	row, err := q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.ID.Eq(id)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		First()
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if row == nil {
		resp.Error(c, "id not found")
		return
	}

	resp.OK(c, getVo(row))
}

func AppJobRemove(c *gin.Context) {
	dto := pojo.AppJobRemoveDto{}
	if err := c.ShouldBindJSON(&dto); err != nil {
		// 处理验证错误
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, dto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	id, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	//删除
	rowsAffected, err := q.NjAppJob.WithContext(c).
		Where(q.NjAppJob.ID.Eq(id)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Update(q.NjAppJob.Deleted, 1)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if rowsAffected.RowsAffected == 0 {
		resp.Error(c, "id not found")
		return
	}
	boot.RunAppJobTaskRemoveById(id)
	resp.OK(c, true)
}

func AppJobRemoveByNamespaceId(nsId int64) {
	q := database.GetQuery()
	rowsAffected, err := q.NjAppJob.WithContext(context.Background()).
		Where(q.NjAppJob.NamespaceId.Eq(nsId)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Update(q.NjAppJob.Deleted, 1)
	if err != nil {
		return
	}
	logger.Info("app job remove by namespaceId", zap.Int64("rowsAffected", rowsAffected.RowsAffected), zap.Int64("nsId", nsId))
}

func AppJobRemoveByAppId(appId int64) {
	q := database.GetQuery()
	rowsAffected, err := q.NjAppJob.WithContext(context.Background()).
		Where(q.NjAppJob.AppId.Eq(appId)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Update(q.NjAppJob.Deleted, 1)
	if err != nil {
		return
	}
	logger.Info("app job remove by appId", zap.Int64("rowsAffected", rowsAffected.RowsAffected), zap.Int64("appId", appId))
}
func AppRemoveByNamespaceId(nsId int64) {
	q := database.GetQuery()
	rowsAffected, err := q.NjApp.WithContext(context.Background()).
		Where(q.NjApp.NamespaceId.Eq(nsId)).
		Where(q.NjApp.Deleted.Eq(0)).
		Update(q.NjApp.Deleted, 1)
	if err != nil {
		return
	}
	logger.Info("app remove by namespaceId", zap.Int64("rowsAffected", rowsAffected.RowsAffected), zap.Int64("nsId", nsId))
}

func getVo(v *model.NjAppJob) *pojo.AppJobVo {
	return &pojo.AppJobVo{
		ID:             strutil.ToStr(v.ID),
		Name:           v.Name,
		Description:    v.Description,
		Model:          v.Model,
		Category:       v.Category,
		Args:           v.Args,
		MaxWorkers:     v.MaxWorkers,
		Cron:           v.Cron,
		Status:         v.Status,
		TimeoutSeconds: v.TimeoutSeconds,
		StartAt:        datetime.DateTimeNil(v.StartAt),
		EndAt:          datetime.DateTimeNil(v.EndAt),
		Reason:         v.Reason,
		Condition:      v.Condition,
		AppId:          strutil.ToStr(v.AppId),
		NamespaceId:    strutil.ToStr(v.NamespaceId),
		CreatedAt:      datetime.DateTime(v.CreatedAt),
		UpdatedAt:      datetime.DateTime(v.UpdatedAt),
	}
}

func GetJobCount() int {
	q := database.GetQuery()
	count, err := q.NjAppJob.WithContext(context.Background()).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Where(q.NjAppJob.Status.Eq(0)).
		Count()
	if err != nil {
		logger.Error("get job count error", zap.Error(err))
		return 0
	}
	return int(count)
}
