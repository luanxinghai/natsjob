package boot

import "natsjob/logger"

func watchConnect() {
	logger.Info("nats connect")
	StartServerMasterAndHeartbeat()
	checkKVKeyValue()
}

func watchDisconnect() {
	logger.Info("nats disconnect")
}
