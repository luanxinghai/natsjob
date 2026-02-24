package boot

import (
	"natsjob/internal/core/register/client_reg"
	"natsjob/internal/core/register/server_reg"
	"natsjob/logger"
	"natsjob/pkg/json"

	"github.com/nats-io/nats.go"
	"go.uber.org/zap"
)

func watchClientReg(entry nats.KeyValueEntry) {
	checkKVKeyValue()

	clientRegKey := entry.Key()
	revision := entry.Revision()

	clientReg := client_reg.ClientReg{}
	err := json.Unmarshal(entry.Value(), &clientReg)
	if err != nil {
		logger.Error("unmarshal clientReg fail",
			zap.String("clientRegKey", clientRegKey),
			zap.Uint64("revision", revision),
			zap.String("value", string(entry.Value())),
			zap.Error(err),
		)
		return
	}

	//如果appName不存在,则忽略
	//if !AppJobMap.HasApp(clientReg.Namespace, clientReg.AppName) {
	//	logger.Error("appName not exist",
	//		zap.String("clientRegKey", clientRegKey),
	//		zap.Uint64("revision", revision),
	//		zap.String("value", string(entry.Value())),
	//	)
	//	return
	//}

	clientReg.UpdateTime = entry.Created()
	if clientReg.Weight < 0 {
		clientReg.Weight = 0
	}
	AppClientRegMap.SetAppClient(&clientReg)
	logger.Info("clientReg kv update",
		zap.String("clientRegKey", clientRegKey),
		zap.Uint64("revision", revision),
		zap.String("value", string(entry.Value())),
		zap.Time("Created", entry.Created()),
	)
}

func watchServerReg(entry nats.KeyValueEntry) {
	checkKVKeyValue()

	serverRegKey := entry.Key()
	revision := entry.Revision()

	serverReg := server_reg.ServerReg{}
	err := json.Unmarshal(entry.Value(), &serverReg)
	if err != nil {
		logger.Error("unmarshal serverReg fail",
			zap.String("serverRegKey", serverRegKey),
			zap.Uint64("revision", revision),
			zap.String("value", string(entry.Value())),
			zap.Error(err),
		)
		return
	}

	AppServerRegMap.SetServerReg(&serverReg)
	//logger.Info("serverReg kv update",
	//	zap.String("serverRegKey", serverRegKey),
	//	zap.Uint64("revision", revision),
	//	zap.String("value", string(entry.Value())),
	//	zap.Time("Created", entry.Created()),
	//)
}
