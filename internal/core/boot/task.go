package boot

import (
	"natsjob/internal/core/enums"
	"natsjob/internal/core/jobs/scheduler/job_broadcast"
	"natsjob/internal/core/jobs/scheduler/job_map"
	"natsjob/internal/core/jobs/scheduler/job_standalone"

	"github.com/robfig/cron/v3"
)

var Task1 = enums.JobCron{
	Namespace:       "app",
	AppName:         "biz",
	JobName:         "owner",
	JobId:           1,
	JobCategory:     enums.JobCategories.Map.Type,
	JobModel:        enums.JobModels.Max.Type,
	Cron:            "0/5 * * * * ?",
	MaxWorkers:      5,
	TimeoutSeconds:  30,
	EntryID:         cron.EntryID(-1),
	JobCronCmd:      CmdJobNext,
	NatsClient:      &natsClient,
	AppClientRegMap: AppClientRegMap,
}

func CmdJobNext(job *enums.JobCron) {
	switch job.JobCategory {
	case enums.JobCategories.Standalone.Type:
		job_standalone.PubNext(job)
	case enums.JobCategories.Broadcast.Type:
		job_broadcast.PubNext(job)
	case enums.JobCategories.Map.Type:
		job_map.PubNextPre(job)
	}
}
