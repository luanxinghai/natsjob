package api_nsapp_service

import (
	"natsjob/internal/core/boot"
	"natsjob/internal/pojo"
	"natsjob/internal/service/api_service"
	"natsjob/internal/service/valid"
	"natsjob/pkg/strutil"
	"natsjob/pkg/web/resp"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NamespaceRemove(c *gin.Context) {
	api_service.NamespaceRemove(c)
	boot.RunAppJobTask()
}
func NamespaceUpdate(c *gin.Context) {
	api_service.NamespaceUpdate(c)
	boot.RunAppJobTask()
}

func AppUpdate(c *gin.Context) {
	api_service.AppUpdate(c)
	boot.RunAppJobTask()
}

func AppRemove(c *gin.Context) {
	api_service.AppRemove(c)
	boot.RunAppJobTask()
}

func AppJobSend(c *gin.Context) {
	if boot.GetIsMaster() == false {
		resp.Error(c, "非主节点，请勿操作")
	}
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

	id, err := strutil.ToInt64(dto.ID)
	if err != nil {
		resp.Error(c, err.Error())
		return
	}

	jobCron := boot.CronManager.GetJobCron(id)
	if jobCron == nil {
		resp.Error(c, "当前任务数据无效")
		return
	}

	jobCron.JobCronCmd(jobCron)

	resp.OK(c, true)
}
