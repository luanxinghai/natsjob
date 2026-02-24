package api_service

import (
	"natsjob/internal/database"
	"natsjob/internal/model"
	"natsjob/internal/pojo"
	"natsjob/internal/service/valid"
	"natsjob/pkg/datetime"
	"natsjob/pkg/ids"
	"natsjob/pkg/strutil"
	"natsjob/pkg/web/page"
	"natsjob/pkg/web/resp"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func AppList(c *gin.Context) {
	queryDto := pojo.AppQuery{
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

	namespaceId, err := strutil.ToInt64(queryDto.NamespaceId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	query := q.NjApp.WithContext(c).
		Where(q.NjApp.Deleted.Eq(0)).
		Where(q.NjApp.NamespaceId.Eq(namespaceId))

	if queryDto.Name != "" {
		query = query.Where(q.NjApp.Name.Like("%" + queryDto.Name + "%"))
	}

	result, count, err := query.
		Order(q.NjApp.ID.Desc()).
		FindByPage(queryDto.GetOffset(), queryDto.GetSize())
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//将result转换为vo
	var resultVo []pojo.AppVo
	for _, v := range result {
		resultVo = append(resultVo, pojo.AppVo{
			ID:          strutil.ToStr(v.ID),
			Name:        v.Name,
			Description: v.Description,
			NamespaceId: strutil.ToStr(v.NamespaceId),
			CreatedAt:   datetime.DateTime(v.CreatedAt),
			UpdatedAt:   datetime.DateTime(v.UpdatedAt),
		})
	}

	resp.OK(c, page.PageResult{
		List:    resultVo,
		Total:   count,
		Current: queryDto.GetCurrent(),
		Size:    queryDto.GetSize(),
	})
}

func AppCreate(c *gin.Context) {
	dto := pojo.AppDto{}
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

	namespaceId, err := strutil.ToInt64(dto.NamespaceId)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//如果存在 抛异常,不存在创建
	_, err = q.NjApp.WithContext(c).
		Where(q.NjApp.Name.Eq(dto.Name)).
		Where(q.NjApp.NamespaceId.Eq(namespaceId)).
		Where(q.NjApp.Deleted.Eq(0)).
		First()
	if err == nil {
		// 记录存在，抛异常
		resp.Error(c, "app name already exists")
		return
	}

	id := ids.Id()
	newApp := &model.NjApp{
		ID:          id,
		Name:        dto.Name,
		Description: dto.Description,
		NamespaceId: namespaceId,
	}
	err = q.NjApp.WithContext(c).
		Create(newApp)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	resp.OK(c, gin.H{"id": strutil.ToStr(newApp.ID)})
}
func AppUpdate(c *gin.Context) {
	dto := pojo.AppUpdateDto{}
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

	//如果存在 抛异常,不存在创建
	_, err = q.NjApp.WithContext(c).
		Where(q.NjApp.ID.Neq(id)).
		Where(q.NjApp.Name.Eq(dto.Name)).
		Where(q.NjApp.Deleted.Eq(0)).
		First()
	if err == nil {
		resp.Error(c, "app name already exists")
		return
	}

	newApp := &model.NjApp{
		ID:          id,
		Name:        dto.Name,
		Description: dto.Description,
	}
	_, err = q.NjApp.WithContext(c).
		Where(q.NjApp.ID.Eq(id)).
		Updates(newApp)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	resp.OK(c, gin.H{"id": strutil.ToStr(newApp.ID)})
}

func AppGet(c *gin.Context) {
	dto := pojo.AppGetDto{}
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

	appId, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	row, err := q.NjApp.WithContext(c).
		Where(q.NjApp.ID.Eq(appId)).
		Where(q.NjApp.Deleted.Eq(0)).
		First()
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if row == nil {
		resp.Error(c, "id not found")
		return
	}

	resp.OK(c, &pojo.AppVo{
		ID:          strutil.ToStr(row.ID),
		Name:        row.Name,
		Description: row.Description,
		NamespaceId: strutil.ToStr(row.NamespaceId),
		CreatedAt:   datetime.DateTime(row.CreatedAt),
		UpdatedAt:   datetime.DateTime(row.UpdatedAt),
	})
}
func AppRemove(c *gin.Context) {
	dto := pojo.AppRemoveDto{}
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
	rowsAffected, err := q.NjApp.WithContext(c).
		Where(q.NjApp.ID.Eq(id)).
		Where(q.NjApp.Deleted.Eq(0)).
		Update(q.NjApp.Deleted, 1)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if rowsAffected.RowsAffected == 0 {
		resp.Error(c, "id not found")
		return
	}
	//删除关联的app job
	AppJobRemoveByAppId(id)

	resp.OK(c, true)
}
