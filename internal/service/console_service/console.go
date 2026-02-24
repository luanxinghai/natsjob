package console_service

import (
	"natsjob/internal/core/boot"
	"natsjob/internal/pojo"
	"natsjob/internal/service/valid"
	"natsjob/pkg/web/resp"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func IsMaster(c *gin.Context) {
	resp.OK(c, boot.GetIsMaster())
}

func CurrentServerReg(c *gin.Context) {
	reg := boot.AppServerRegMap.GetCurrentServerReg()
	reg.NatsConnect = boot.IsConnected()
	resp.OK(c, reg)
}

func ClientRegNs(c *gin.Context) {
	queryDto := pojo.ConsoleClientRegNsDto{}
	if err := c.ShouldBind(&queryDto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, queryDto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	resp.OK(c, boot.AppClientRegMap.GetNsClientReg(queryDto.Namespace))
}

func ClientRegApp(c *gin.Context) {
	queryDto := pojo.ConsoleClientRegAppDto{}
	if err := c.ShouldBind(&queryDto); err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			errorMsg := valid.ValidationError(validationErrors, queryDto)
			resp.Error(c, errorMsg)
			return
		}
		resp.Error(c, err.Error())
		return
	}
	resp.OK(c, boot.AppClientRegMap.GetNsClientRegApp(queryDto.Namespace, queryDto.AppName))
}

func ServerReg(c *gin.Context) {
	resp.OK(c, boot.AppServerRegMap.GetServerReg())
}
