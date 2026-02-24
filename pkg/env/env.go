package env

import (
	"natsjob/pkg/strutil"
	"os"
)

func GetEnvDefault(key, defVal string) string {
	val, ok := os.LookupEnv(key)
	if ok {
		return val
	}
	return defVal
}

func GetEnvDefaultPro(key string, flagValue string, localCfgValue string, defVal string) string {
	val, ok := os.LookupEnv(key)
	if ok {
		return val
	}
	if flagValue != "" {
		return flagValue
	}

	if localCfgValue != "" {
		return localCfgValue
	}

	return defVal
}

func GetEnvDefaultMax(key string, flagValue int64, localCfgValue int64, defVal int64) int64 {
	val, ok := os.LookupEnv(key)
	if ok {
		value := strutil.ToInt64OrZero(val)
		if value > 0 {
			return value
		}
	}
	if flagValue > 0 {
		return flagValue
	}

	if localCfgValue > 0 {
		return localCfgValue
	}

	return defVal
}

func GetEnv(key string) string {
	val, ok := os.LookupEnv(key)
	if ok {
		return val
	}
	return ""
}
