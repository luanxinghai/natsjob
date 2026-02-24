package task_service

import (
	"context"
	"natsjob/internal/dao/query"

	"natsjob/internal/core/enums"
	"natsjob/internal/database"
	"natsjob/internal/model"
	"natsjob/logger"

	"go.uber.org/zap"
)

func GetAppJob() []*enums.JobCron {
	q := query.Use(database.DB)

	//读取命名空间
	namespaces, err := q.NjNamespace.WithContext(context.Background()).
		Where(q.NjNamespace.Deleted.Eq(0)).
		Find()
	if err != nil {
		logger.Error("err", zap.Error(err))
	}

	apps, err := q.NjApp.WithContext(context.Background()).
		Where(q.NjApp.Deleted.Eq(0)).
		Find()
	if err != nil {
		logger.Error("err", zap.Error(err))
	}

	appJobs, err := q.NjAppJob.WithContext(context.Background()).
		Where(q.NjAppJob.Status.Eq(0)).
		Where(q.NjAppJob.Deleted.Eq(0)).
		Find()
	if err != nil {
		logger.Error("err", zap.Error(err))
	}

	var tasks []*enums.JobCron
	for _, job := range appJobs {
		appItem := getAppJobItem(apps, job.AppId)
		if appItem == nil {
			logger.Error("app item is nil", zap.Int64("appId", job.AppId))
			continue
		}

		nsItem := getNamespaceItem(namespaces, appItem.NamespaceId)

		tasks = append(tasks, &enums.JobCron{
			NamespaceId:    nsItem.ID,
			Namespace:      nsItem.Name,
			AppId:          appItem.ID,
			AppName:        appItem.Name,
			JobId:          job.ID,
			JobName:        job.Name,
			JobCategory:    job.Category,
			JobModel:       job.Model,
			Cron:           job.Cron,
			JobArgs:        job.Args,
			MaxWorkers:     int(job.MaxWorkers),
			TimeoutSeconds: job.TimeoutSeconds,
		})
	}

	logger.Info("tasks", zap.Any("tasks", tasks))
	return tasks
}

func GetAppJobByJobId(jobId int64) *enums.JobCron {
	q := query.Use(database.DB)

	job, err := q.NjAppJob.WithContext(context.Background()).
		Where(q.NjAppJob.ID.Eq(jobId)).
		First()
	if err != nil {
		logger.Error("err", zap.Error(err))
		return nil
	}
	//读取应用
	appItem, err := q.NjApp.WithContext(context.Background()).
		Where(q.NjApp.Deleted.Eq(0)).
		Where(q.NjApp.ID.Eq(job.AppId)).
		First()
	if err != nil {
		logger.Error("err", zap.Error(err))
		return nil
	}

	//读取命名空间
	nsItem, err := q.NjNamespace.WithContext(context.Background()).
		Where(q.NjNamespace.Deleted.Eq(0)).
		Where(q.NjNamespace.ID.Eq(appItem.NamespaceId)).
		First()
	if err != nil {
		logger.Error("err", zap.Error(err))
		return nil
	}

	return &enums.JobCron{
		NamespaceId:    nsItem.ID,
		Namespace:      nsItem.Name,
		AppId:          appItem.ID,
		AppName:        appItem.Name,
		JobId:          job.ID,
		JobName:        job.Name,
		JobCategory:    job.Category,
		JobModel:       job.Model,
		Cron:           job.Cron,
		JobArgs:        job.Args,
		MaxWorkers:     int(job.MaxWorkers),
		TimeoutSeconds: job.TimeoutSeconds,
	}
}

func getNamespaceItem(namespaces []*model.NjNamespace, nsID int64) *model.NjNamespace {
	for _, ns := range namespaces {
		if ns.ID == nsID {
			return ns
		}
	}
	return &model.NjNamespace{
		ID:   1,
		Name: "app",
	}
}

func getAppJobItem(apps []*model.NjApp, appId int64) *model.NjApp {
	for _, item := range apps {
		if item.ID == appId {
			return item
		}
	}
	return nil
}
