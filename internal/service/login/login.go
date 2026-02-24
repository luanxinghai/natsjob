package login

import (
	"fmt"
	"natsjob/config"
	"natsjob/internal/pojo"
	"natsjob/pkg/jwt"
	"natsjob/pkg/web/resp"
	"time"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	loginUser := pojo.LoginPlusDto{}
	if err := c.ShouldBind(&loginUser); err != nil {
		resp.Error(c, err.Error())
		return
	}

	targetTimeMs := time.UnixMilli(loginUser.Time)
	targetTime := targetTimeMs.Add(30 * time.Minute)
	currentTime := time.Now()

	// 5. 进行时间比较
	if currentTime.After(targetTime) {
		resp.Error(c, "login sign error: time out")
		return
	}

	signValue := "luanxinghai" + config.EnvParam.LoginUserId + config.EnvParam.LoginPwd + fmt.Sprintf("%d", loginUser.Time) + "natsjob"
	encryptedStr, err := AesCbcEncrypt(signValue)
	if err != nil {
		resp.Error(c, "login sign error: "+err.Error())
		return
	}

	if encryptedStr == loginUser.Sign {
		token, err := jwt.GenerateToken(loginUser.UserId)
		if err != nil {
			resp.Error(c, "create token fail: "+err.Error())
			return
		}

		vo := pojo.LoginVo{
			Token: token,
		}
		resp.OK(c, vo)
	} else {
		resp.Error(c, "userId or password error")
	}
}
