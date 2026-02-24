package auth

import (
	"fmt"
	"natsjob/logger"
	"natsjob/pkg/jwt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

/**
*RecoveryAndLogger 是一个组合中间件，用于：
*- 捕获 panic 并返回 500 错误
*- 记录请求耗时
 **/
func RecoveryAndLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		// defer 保证在请求处理结束后执行
		defer func() {
			if err := recover(); err != nil {
				// 记录 panic 信息
				// 类型检查确保 err 是 error 类型
				if e, ok := err.(error); ok {
					logger.Info("Panic recovered", zap.Error(e))
				} else {
					// 非 error 类型转换为字符串记录
					logger.Info("Panic recovered", zap.String("error", fmt.Sprintf("%v", err)))
				}
				// 返回统一错误响应
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"error": "Internal Server Error",
				})
			}

			// 计算耗时
			duration := time.Since(start)
			logger.Info("http-request",
				zap.String("method", c.Request.Method),
				zap.String("path", c.Request.URL.Path),
				zap.Int("status", c.Writer.Status()),
				zap.Duration("duration", duration),
				zap.String("ip", c.ClientIP()),
				//zap.String("user-agent", c.Request.UserAgent()),
			)
		}()

		// 继续处理请求
		c.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(401, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// 验证token
		claims, err := jwt.ParseToken(strings.TrimPrefix(token, "Bearer "))
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("userId", claims.UserId)
		c.Next()
	}
}

func GetUserId(c *gin.Context) uint {
	if userIDRaw, exists := c.Get("userId"); exists {
		if userID, ok := userIDRaw.(uint); ok {
			return userID
		}
	}
	return 0
}

//func Success(c *gin.Context, data interface{}) {
//	c.JSON(http.StatusOK, gin.H{
//		"code": 0,
//		"data": data,
//	})
//}
//
//func Fail(c *gin.Context, error string) {
//	c.JSON(http.StatusBadRequest, gin.H{
//		"code":  1,
//		"error": error,
//	})
//}
//
//func FailWithCode(StatusCode int, c *gin.Context, msg string) {
//	c.JSON(StatusCode, gin.H{
//		"code":  1,
//		"error": msg,
//	})
//}
