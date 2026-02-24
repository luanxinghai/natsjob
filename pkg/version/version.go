package version

import (
	"runtime"
	"sync"
)

type VersionInfo struct {
	Version   string `json:"version"`
	BuildTime string `json:"buildTime"`
	GoVersion string `json:"goVersion"`
}

var once sync.Once
var versionInstance = VersionInfo{}

func Set(version string, buildTime string) {
	once.Do(func() {
		versionInstance = VersionInfo{
			Version:   version,
			BuildTime: buildTime,
			GoVersion: runtime.Version(),
		}
		///logger.Info("natsjob version", zap.Any("version", versionInstance))
	})
}

func Get() VersionInfo {
	return versionInstance
}
