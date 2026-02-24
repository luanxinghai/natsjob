package strutil

import (
	"strconv"
	"strings"
)

func ToStr(value int64) string {
	return strconv.FormatInt(value, 10)
}
func ToInt64(s string) (i int64, err error) {
	return strconv.ParseInt(s, 10, 64)
}
func ToInt64OrZero(s string) int64 {
	i, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0
	}
	return i
}
func JoinByDot(parts ...string) string {
	if len(parts) == 0 {
		return ""
	}

	// 估算总长度：各部分长度 + (n-1) 个分隔符
	totalLen := len(parts) - 1
	for _, p := range parts {
		totalLen += len(p)
	}

	var builder strings.Builder
	builder.Grow(totalLen)
	for i, p := range parts {
		if i > 0 {
			builder.WriteByte('.')
		}
		builder.WriteString(p)
	}
	return builder.String()
}

func Join(parts ...string) string {
	if len(parts) == 0 {
		return ""
	}
	// 估算总长度：各部分长度 + (n-1) 个分隔符
	totalLen := len(parts) - 1
	for _, p := range parts {
		totalLen += len(p)
	}

	var builder strings.Builder
	builder.Grow(totalLen)
	for _, p := range parts {
		builder.WriteString(p)
	}
	return builder.String()
}
