package api_service

import (
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
	"go.uber.org/zap"
)

func NamespaceListAll(c *gin.Context) {
	q := database.GetQuery()
	result, err := q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.Deleted.Eq(0)).
		Order(q.NjNamespace.ID.Asc()).
		Find()
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	var resultVo []pojo.NamespaceVo
	for _, v := range result {
		vo := getNsVo(v)
		resultVo = append(resultVo, *vo)
	}
	resp.OK(c, resultVo)
}

func NamespaceList(c *gin.Context) {
	queryDto := pojo.NamespaceQuery{
		Pagination: page.Pagination{
			Current: 1,
			Size:    10,
		},
	}
	if err := c.ShouldBind(&queryDto); err != nil {
		logger.Error("param error", zap.Error(err))
		resp.Error(c, err.Error())
		return
	}
	q := database.GetQuery()

	result, count, err := q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.Deleted.Eq(0)).
		Order(q.NjNamespace.ID.Asc()).
		FindByPage(queryDto.GetOffset(), queryDto.GetSize())
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//将result转换为vo
	var resultVo []pojo.NamespaceVo
	for _, v := range result {
		vo := getNsVo(v)
		resultVo = append(resultVo, *vo)
	}

	resp.OK(c, page.PageResult{
		List:    resultVo,
		Total:   count,
		Current: queryDto.GetCurrent(),
		Size:    queryDto.GetSize(),
	})
}

func NamespaceCreate(c *gin.Context) {
	dto := pojo.NamespaceDto{}
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
	//如果存在 抛异常,不存在创建
	_, err := q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.Name.Eq(dto.Name)).
		Where(q.NjNamespace.Deleted.Eq(0)).
		First()
	if err == nil {
		// 记录存在，抛异常
		resp.Error(c, "namespace already exists")
		return
	}

	id := ids.Id()
	newNamespace := &model.NjNamespace{
		ID:          id,
		Name:        dto.Name,
		Description: dto.Description,
	}
	err = q.NjNamespace.WithContext(c).
		Create(newNamespace)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	resp.OK(c, gin.H{"id": strutil.ToStr(newNamespace.ID)})
}

func NamespaceUpdate(c *gin.Context) {
	dto := pojo.NamespaceUpdateDto{}
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

	if dto.ID == "1" {
		resp.Error(c, "cannot delete system default data")
		return
	}

	q := database.GetQuery()
	id, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	//如果存在 抛异常,不存在创建
	_, err = q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.ID.Neq(id)).
		Where(q.NjNamespace.Name.Eq(dto.Name)).
		Where(q.NjNamespace.Deleted.Eq(0)).
		First()
	if err == nil {
		resp.Error(c, "namespace already exists")
		return
	}

	newNamespace := &model.NjNamespace{
		ID:          id,
		Name:        dto.Name,
		Description: dto.Description,
	}
	_, err = q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.ID.Eq(id)).
		Updates(newNamespace)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	resp.OK(c, gin.H{"id": strutil.ToStr(newNamespace.ID)})
}

func NamespaceGet(c *gin.Context) {
	dto := pojo.NamespaceGetDto{}
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

	namespaceId, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	namespace, err := q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.ID.Eq(namespaceId)).
		Where(q.NjNamespace.Deleted.Eq(0)).
		First()
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if namespace == nil {
		resp.Error(c, "id not found")
		return
	}

	resp.OK(c, getNsVo(namespace))
}

func NamespaceRemove(c *gin.Context) {
	dto := pojo.NamespaceRemoveDto{}
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
	rowsAffected, err := q.NjNamespace.WithContext(c).
		Where(q.NjNamespace.ID.Eq(id)).
		Where(q.NjNamespace.Deleted.Eq(0)).
		Update(q.NjNamespace.Deleted, 1)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}
	if rowsAffected.RowsAffected == 0 {
		resp.Error(c, "id not found")
		return
	}

	//删除关联的app
	AppRemoveByNamespaceId(id)
	AppJobRemoveByNamespaceId(id)

	resp.OK(c, true)
}
func getNsVo(v *model.NjNamespace) *pojo.NamespaceVo {
	return &pojo.NamespaceVo{
		ID:          strutil.ToStr(v.ID),
		Name:        v.Name,
		Description: v.Description,
		CreatedAt:   datetime.DateTime(v.CreatedAt),
		UpdatedAt:   datetime.DateTime(v.UpdatedAt),
	}
}
