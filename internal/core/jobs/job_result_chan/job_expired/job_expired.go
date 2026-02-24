package job_expired

import (
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/job_result_chan/job_result_client_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_end"
	"natsjob/internal/core/jobs/job_result_chan/job_result_service"
	"time"

	"github.com/jellydator/ttlcache/v3"
	"github.com/nats-io/nats.go"
)

var tasks = make(chan Task, 10000)
var tasksSub = make(chan Task, 10000)
var semaphore chan struct{}

type Task struct {
	Item               *ttlcache.Item[string, string]
	JobKeyKeyValue     nats.KeyValue
	JobResultsKeyValue nats.KeyValue
	ExpireEndTime      time.Time
}

func InitSemaphore(DBChanSemaphore chan struct{}) {
	semaphore = DBChanSemaphore
}
func init() {
	go runChain()
}

func SetTask(task Task) {
	tasks <- task
}
func SetTaskSub(task Task) {
	tasksSub <- task
}

func runChain() {
	for {
		select {
		case task, _ := <-tasks:
			semaphore <- struct{}{}
			go func() {
				defer func() {
					<-semaphore
				}()
				removeCacheExpire(task)
			}()
		case task, _ := <-tasksSub:
			semaphore <- struct{}{}
			go func() {
				defer func() {
					<-semaphore
				}()
				removeCacheExpireSub(task)
			}()
		}
	}
}
func removeCacheExpire(task Task) {
	item := task.Item
	//jobEndKey := item.Key()
	jobEndKey := item.Value()
	jobResultEndInfo := job_result_service.JobResultEndInfo{
		IsSuccess:     false,
		IsSuccessNext: false,
		IsErr:         false,
		IsFail:        true,
		Status:        enums.JOB_RESULT_STATUS.Expired,
		Reason:        "",
	}
	job_result_end.JobResultSuccessFail(jobEndKey, task.JobKeyKeyValue, task.JobResultsKeyValue, &jobResultEndInfo)
}

func removeCacheExpireSub(task Task) {
	item := task.Item
	jobEndKey := item.Key()
	jobResultEndInfo := job_result_service.JobResultEndInfo{
		IsSuccess:     false,
		IsSuccessNext: false,
		IsErr:         false,
		IsFail:        true,
		Status:        enums.JOB_RESULT_STATUS.Expired,
		Reason:        "",
	}
	job_result_client_end.JobResultSuccessFail(jobEndKey, task.JobKeyKeyValue, task.JobResultsKeyValue, &jobResultEndInfo)
}
