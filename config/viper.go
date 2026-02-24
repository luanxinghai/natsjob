package config

import (
	"fmt"
	"natsjob/pkg/json"
	"os"

	"github.com/spf13/viper"
)

// 检查文件是否存在的工具函数
func fileExists(filePath string) bool {
	// os.Stat 获取文件信息，os.IsNotExist 判断是否不存在
	_, err := os.Stat(filePath)
	return !os.IsNotExist(err)
}

func LoadLocalConfig() *EnvParamConfig {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./conf")

	// 设置默认值
	//viper.SetDefault("server.port", ":8080")
	// 2. 指定目标配置文件路径
	outputFile := "./conf/config.yaml"
	if !fileExists(outputFile) {
		configContent := fmt.Sprintf(`%s: "%s"
%s: "%s"
%s: "%s"
%s: "%s"
%s: "%s"
%s: "%s"
%s: "%d"
%s: "%d"
%s: "%s"
%s: "%s"
%s: "%d"
`,
			//EnvNamespace,
			//EnvNamespaceOnlyJob,
			EnvLogEnv,
			envDefaultValue.LogEnv,
			EnvNatsUrl,
			envDefaultValue.NatsUrl,
			EnvSecretKey,
			envDefaultValue.SecretKey,
			EnvHttpPort,
			envDefaultValue.HttpPort,
			EnvLoginUser,
			envDefaultValue.LoginUserId,
			EnvLoginPwd,
			envDefaultValue.LoginPwd,
			EnvLoginTokenExpireHours,
			envDefaultValue.LoginTokenExpireHours,
			EnvJobResultExpireHours,
			envDefaultValue.JobResultExpireHours,
			EnvDbType,
			envDefaultValue.DBType,
			EnvDbUrl,
			envDefaultValue.DBUrl,
			EnvDbChanCount,
			envDefaultValue.DBChanCount,
		)
		err := os.WriteFile(outputFile, []byte(configContent), 0644)
		if err != nil {
			fmt.Printf("warn: write config file fail: %v\n", err)
			return &EnvParamConfig{}
		}
	}

	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("warn: read config file fail: %v\n", err)
		return &EnvParamConfig{}
	}

	var cfg EnvParamConfig
	if err := viper.Unmarshal(&cfg); err != nil {
		fmt.Println("config file: failg %v", err)
		return &EnvParamConfig{}
	}

	fmt.Printf("config file: %s; %s\n", viper.ConfigFileUsed(), json.MustMarshal(cfg))
	return &cfg
}
