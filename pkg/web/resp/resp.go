package resp

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func OK(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Code:    0,
		Message: "",
		Data:    data,
	})
}

func Error(c *gin.Context, msg string) {
	c.JSON(http.StatusBadRequest, Response{
		Code:    1,
		Message: msg,
	})
}

func ErrorCode(c *gin.Context, code int, msg string) {
	c.JSON(http.StatusBadRequest, Response{
		Code:    code,
		Message: msg,
	})
}
