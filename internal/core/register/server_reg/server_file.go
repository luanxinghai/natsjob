package server_reg

import (
	"natsjob/logger"
	"os"

	"go.uber.org/zap"
)

const (
	serverIdFilePath = "conf"
	serverIdFileName = "./conf/server-id.key"
)

func getLocalFileKeyId(idValue string) (id string) {
	ensureConfigPath(serverIdFilePath)
	// 检查文件是否存在
	if _, err := os.Stat(serverIdFileName); os.IsNotExist(err) {
		writeFileToLocal(idValue)
		return idValue
	}

	// 文件存在，读取内容
	content, err := os.ReadFile(serverIdFileName)
	if err != nil || len(content) == 0 {
		writeFileToLocal(idValue)
		return idValue
	}

	return string(content)
}

/*
*
确保配置路径存在，不存在则创建
*/
func ensureConfigPath(configPath string) {
	// 自动创建 目录（如果不存在）
	if _, err := os.Stat(serverIdFilePath); os.IsNotExist(err) {
		_ = os.Mkdir(serverIdFilePath, 0755)
	}
}
func writeFileToLocal(idValue string) {
	if err := os.WriteFile(serverIdFileName, []byte(idValue), 0644); err != nil {
		logger.Error("server key write fail", zap.Error(err))
	}
}
