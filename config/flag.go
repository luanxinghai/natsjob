package config

import (
	"fmt"
	"natsjob/pkg/json"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

func LoadFlagConfig() *EnvParamConfig {
	//pflag.String(EnvNamespace, "", "日志环境")
	//pflag.String(EnvNamespaceOnlyJob, "", "是否只在job namespace下创建job，默认false")
	pflag.String(EnvLogEnv, "", "日志环境")
	pflag.String(EnvNatsUrl, "", "nats url")
	pflag.String(EnvSecretKey, "", "密钥")
	pflag.String(EnvHttpPort, "", "服务端口")
	pflag.String(EnvLoginUser, "", "登录用户id")
	pflag.String(EnvLoginPwd, "", "登录密码")
	pflag.Int64(EnvLoginTokenExpireHours, 0, "登陆token有效期")
	pflag.Int64(EnvJobResultExpireHours, 0, "保留任务历史结果时间")
	pflag.String(EnvDbType, "", "数据库类型")
	pflag.String(EnvDbUrl, "", "数据库url")
	pflag.Int64(EnvDbChanCount, 0, "数据库并行数量")

	pflag.Parse()

	//viper.BindPFlag(EnvNamespace, pflag.Lookup(EnvNamespace))
	//viper.BindPFlag(EnvNamespaceOnlyJob, pflag.Lookup(EnvNamespaceOnlyJob))
	viper.BindPFlag(EnvLogEnv, pflag.Lookup(EnvLogEnv))
	viper.BindPFlag(EnvNatsUrl, pflag.Lookup(EnvNatsUrl))
	viper.BindPFlag(EnvSecretKey, pflag.Lookup(EnvSecretKey))
	viper.BindPFlag(EnvHttpPort, pflag.Lookup(EnvHttpPort))
	viper.BindPFlag(EnvLoginUser, pflag.Lookup(EnvLoginUser))
	viper.BindPFlag(EnvLoginPwd, pflag.Lookup(EnvLoginPwd))
	viper.BindPFlag(EnvLoginTokenExpireHours, pflag.Lookup(EnvLoginTokenExpireHours))
	viper.BindPFlag(EnvJobResultExpireHours, pflag.Lookup(EnvJobResultExpireHours))
	viper.BindPFlag(EnvDbType, pflag.Lookup(EnvDbType))
	viper.BindPFlag(EnvDbUrl, pflag.Lookup(EnvDbUrl))
	viper.BindPFlag(EnvDbChanCount, pflag.Lookup(EnvDbChanCount))

	var cfg EnvParamConfig
	if err := viper.Unmarshal(&cfg); err != nil {
		fmt.Println("flag config fail: %v", err)
		return &EnvParamConfig{}
	}
	// 5. 验证结果
	fmt.Printf("flag config: %s\n", json.MustMarshal(cfg))
	return &cfg
}
