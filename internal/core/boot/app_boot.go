package boot

import (
	"natsjob/config"
	"natsjob/internal/core/cache"
	"natsjob/internal/core/cronmgr"
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/appjob"
	"natsjob/internal/core/jobs/job_result_chan/job_expired"
	"natsjob/internal/core/jobs/job_result_chan/job_result_client_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_pre_end"
	"natsjob/internal/core/natsclient"
	"natsjob/internal/core/register/client_reg"
	"natsjob/internal/core/register/server_reg"
	"natsjob/internal/database"
	"natsjob/internal/service/task_service"

	"github.com/nats-io/nats.go"
	"github.com/robfig/cron/v3"
)

// 服务端定时任务
var serverMasterCron = cron.New()

// 定时任务管理器
var CronManager = cronmgr.NewCronManager()
var natsClient = enums.NatsClient{}

// 存储AppName+JobName 与 定时任务关系
var AppJobMap = appjob.NewAppJobManager()

// 存储App与client注册关系
var AppClientRegMap = client_reg.NewClientReg()
var AppServerRegMap = server_reg.NewServerReg(&natsClient)
var DBChanSemaphore chan struct{}

func InitServer() {
	setDbChanSemaphore()
	database.InitDB()
	cache.InitCache(OnEviction, OnEvictionSub)
	natsClient.WatcherJobResults = watchJobResults
	natsClient.WatcherClientReg = watchClientReg
	natsClient.WatcherServerReg = watchServerReg
	natsClient.ConnectOK = watchConnect
	natsClient.Disconnect = watchDisconnect

	// 监听任务
	task_service.JobMonitor = JobMonitor

	go natsClientStart()

	// 启动服务端定时任务
	StartServerCronTask()
}

// 设置数据库并发控制参数
func setDbChanSemaphore() {
	DBChanSemaphore = make(chan struct{}, config.EnvParam.DBChanCount)
	job_expired.InitSemaphore(DBChanSemaphore)
	job_result_end.InitSemaphore(DBChanSemaphore)
	job_result_client_end.InitSemaphore(DBChanSemaphore)
	job_result_pre_end.InitSemaphore(DBChanSemaphore)
}

func natsClientStart() {
	natsclient.Connect(&natsClient)
}

func natsClientKeyValue(natsClient *enums.NatsClient, bucket string) (nats.KeyValue, error) {
	js, _ := natsClient.Nc.JetStream()
	return js.KeyValue(bucket)
}

func IsConnected() bool {
	return natsClient.Connected.Load()
}
