package router

import (
	"natsjob/internal/service/api_nsapp_service"
	"natsjob/internal/service/api_service"
	"natsjob/internal/service/auth"
	"natsjob/internal/service/cache_service"
	"natsjob/internal/service/console_service"
	"natsjob/internal/service/login"
	"natsjob/internal/service/valid"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(auth.RecoveryAndLogger())

	valid.SetupValidators()

	authorized := r.Group("/natsjob/api/")
	{
		authorized.POST("login", login.Login)
	}

	biz := r.Group("/natsjob/api/")
	biz.Use(auth.AuthMiddleware())
	{
		biz.POST("namespace/list", api_service.NamespaceList)
		biz.POST("namespace/list-all", api_service.NamespaceListAll)
		biz.POST("namespace/create", api_service.NamespaceCreate)
		biz.POST("namespace/update", api_nsapp_service.NamespaceUpdate)
		biz.POST("namespace/get", api_service.NamespaceGet)
		biz.POST("namespace/remove", api_nsapp_service.NamespaceRemove)

		biz.POST("app/list", api_service.AppList)
		biz.POST("app/create", api_service.AppCreate)
		biz.POST("app/update", api_nsapp_service.AppUpdate)
		biz.POST("app/get", api_service.AppGet)
		biz.POST("app/remove", api_nsapp_service.AppRemove)

		biz.POST("app-job/list", api_service.AppJobList)
		biz.POST("app-job/create", api_service.AppJobCreate)
		biz.POST("app-job/update", api_service.AppJobUpdate)
		biz.POST("app-job/get", api_service.AppJobGet)
		biz.POST("app-job/remove", api_service.AppJobRemove)
		biz.POST("app-job/send", api_nsapp_service.AppJobSend)

		biz.POST("app-job-result/list", api_service.AppJobResultList)
		biz.POST("app-job-sub-result/list", api_service.AppJobSubResultList)

	}

	console := r.Group("/natsjob/api/console/")
	console.Use(auth.AuthMiddleware())
	{
		console.POST("is-master", console_service.IsMaster)
		console.POST("server-reg", console_service.ServerReg)
		console.POST("current-server-reg", console_service.CurrentServerReg)
		console.POST("client-reg-ns", console_service.ClientRegNs)
		console.POST("client-reg-app", console_service.ClientRegApp)

		//缓存统计
		console.POST("cache/stat", cache_service.CacheStat)
	}

	return r
}
