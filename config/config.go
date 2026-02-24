package config

import (
	"natsjob/global"
	"natsjob/pkg/env"

	"go.uber.org/zap/zapcore"
)

const (
	EnvNamespace             = "NATSJOB_NAMESPACE"
	EnvNamespaceOnlyJob      = "NATSJOB_NAMESPACE_ONLY_JOB"
	EnvLogEnv                = "NATSJOB_LOG_ENV"
	EnvNatsUrl               = "NATSJOB_NATS_URL"
	EnvSecretKey             = "NATSJOB_SECRET_KEY"
	EnvHttpPort              = "NATSJOB_HTTP_PORT"
	EnvLoginUser             = "NATSJOB_LOGIN_USER"
	EnvLoginPwd              = "NATSJOB_LOGIN_PWD"
	EnvLoginTokenExpireHours = "NATSJOB_LOGIN_TOKEN_EXPIRE_HOURS"
	EnvJobResultExpireHours  = "NATSJOB_JOB_RESULT_EXPIRE_HOURS"
	EnvDbType                = "NATSJOB_DB_TYPE"
	EnvDbUrl                 = "NATSJOB_DB_URL"
	EnvDbChanCount           = "NATSJOB_DB_CHAN_COUNT"
)

var envDefaultValue = EnvParamConfig{
	Codenames:             "乱星海",
	AppName:               "natsjob",
	Author:                "古或今",
	License:               "Apache 2.0",
	TopicPrefix:           global.APP,
	NameSpace:             global.Namespace,
	NameSpaceOnlyJob:      "false",
	LogEnv:                "console",
	NatsUrl:               "nats://127.0.0.1:4222",
	SecretKey:             "8ac09b95b7734ddfb0e76817c6sqqsss",
	HttpPort:              "7788",
	LoginUserId:           "natsjob",
	LoginPwd:              "natsjob",
	LoginTokenExpireHours: 2,
	JobResultExpireHours:  24,
	DBType:                "sqlite",
	DBUrl:                 "",
	DBChanCount:           100,
}

type EnvParamConfig struct {
	Codenames             string
	AppName               string
	Author                string
	License               string
	TopicPrefix           string
	NameSpace             string `mapstructure:"NATSJOB_NAMESPACE"`
	NameSpaceOnlyJob      string `mapstructure:"NATSJOB_NAMESPACE_ONLY_JOB"`
	LogEnv                string `mapstructure:"NATSJOB_LOG_ENV"`
	NatsUrl               string `mapstructure:"NATSJOB_NATS_URL"`
	SecretKey             string `mapstructure:"NATSJOB_SECRET_KEY"`
	HttpPort              string `mapstructure:"NATSJOB_HTTP_PORT"`
	LoginUserId           string `mapstructure:"NATSJOB_LOGIN_USER"`
	LoginPwd              string `mapstructure:"NATSJOB_LOGIN_PWD"`
	LoginTokenExpireHours int64  `mapstructure:"NATSJOB_LOGIN_TOKEN_EXPIRE_HOURS"`
	JobResultExpireHours  int64  `mapstructure:"NATSJOB_JOB_RESULT_EXPIRE_HOURS"`
	DBType                string `mapstructure:"NATSJOB_DB_TYPE"`
	DBUrl                 string `mapstructure:"NATSJOB_DB_URL"`
	DBChanCount           int64  `mapstructure:"NATSJOB_DB_CHAN_COUNT"`
}

var EnvParam EnvParamConfig

func InitEnvParam() {
	localConfig := LoadLocalConfig()
	flagConfig := LoadFlagConfig()

	EnvParam = EnvParamConfig{
		Codenames:             envDefaultValue.Codenames,
		AppName:               envDefaultValue.AppName,
		Author:                envDefaultValue.Author,
		License:               envDefaultValue.License,
		TopicPrefix:           envDefaultValue.TopicPrefix,
		NameSpace:             env.GetEnvDefault(EnvNamespace, envDefaultValue.NameSpace),
		NameSpaceOnlyJob:      env.GetEnvDefault(EnvNamespaceOnlyJob, envDefaultValue.NameSpaceOnlyJob),
		LogEnv:                env.GetEnvDefaultPro(EnvLogEnv, flagConfig.LogEnv, localConfig.LogEnv, envDefaultValue.LogEnv),
		NatsUrl:               env.GetEnvDefaultPro(EnvNatsUrl, flagConfig.NatsUrl, localConfig.NatsUrl, envDefaultValue.NatsUrl),
		SecretKey:             env.GetEnvDefaultPro(EnvSecretKey, flagConfig.SecretKey, localConfig.SecretKey, envDefaultValue.SecretKey),
		HttpPort:              env.GetEnvDefaultPro(EnvHttpPort, flagConfig.HttpPort, localConfig.HttpPort, envDefaultValue.HttpPort),
		LoginUserId:           env.GetEnvDefaultPro(EnvLoginUser, flagConfig.LoginUserId, localConfig.LoginUserId, envDefaultValue.LoginUserId),
		LoginPwd:              env.GetEnvDefaultPro(EnvLoginPwd, flagConfig.LoginPwd, localConfig.LoginPwd, envDefaultValue.LoginPwd),
		LoginTokenExpireHours: env.GetEnvDefaultMax(EnvLoginTokenExpireHours, flagConfig.LoginTokenExpireHours, localConfig.LoginTokenExpireHours, envDefaultValue.LoginTokenExpireHours),
		JobResultExpireHours:  env.GetEnvDefaultMax(EnvJobResultExpireHours, flagConfig.JobResultExpireHours, localConfig.JobResultExpireHours, envDefaultValue.JobResultExpireHours),
		DBType:                env.GetEnvDefaultPro(EnvDbType, flagConfig.DBType, localConfig.DBType, envDefaultValue.DBType),
		DBUrl:                 env.GetEnvDefaultPro(EnvDbUrl, flagConfig.DBUrl, localConfig.DBUrl, ""),
		DBChanCount:           env.GetEnvDefaultMax(EnvDbChanCount, flagConfig.DBChanCount, localConfig.DBChanCount, envDefaultValue.DBChanCount),
	}
}

func (o EnvParamConfig) MarshalLogObject(enc zapcore.ObjectEncoder) error {
	enc.AddString("codenames", o.Codenames)
	enc.AddString("appName", o.AppName)
	enc.AddString("author", o.Author)
	enc.AddString("license", o.License)
	enc.AddString("topicPrefix", o.TopicPrefix)
	enc.AddString("nameSpace", o.NameSpace)
	enc.AddString("nameSpaceOnlyJob", o.NameSpaceOnlyJob)
	enc.AddString("logEnv", o.LogEnv)
	enc.AddString("natsUrl", o.NatsUrl)
	enc.AddString("httpPort", o.HttpPort)
	enc.AddString("loginUser", o.LoginUserId)
	enc.AddString("loginPwd", "*")
	enc.AddInt64("loginTokenExpireHours", o.LoginTokenExpireHours)
	enc.AddInt64("jobResultExpireHours", o.JobResultExpireHours)
	enc.AddString("dbType", o.DBType)
	enc.AddString("dbUrl", "*")
	return nil
}
