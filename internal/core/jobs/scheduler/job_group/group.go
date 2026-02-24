package job_group

import "natsjob/internal/core/enums"

func PubNext(job *enums.JobCron) {
	switch job.JobModel {
	case enums.JobModels.Lite.Type:
		liteJob(job)
	case enums.JobModels.Plus.Type:
		plusJob(job)
	case enums.JobModels.Max.Type:
		maxJob(job)
	case enums.JobModels.Pro.Type:
		proJob(job)
	case enums.JobModels.Ultra.Type:
		ultraJob(job)
	}
}

func ultraJob(job *enums.JobCron) {

}

func proJob(job *enums.JobCron) {

}

func maxJob(job *enums.JobCron) {

}

func plusJob(job *enums.JobCron) {

}

func liteJob(job *enums.JobCron) {

}
