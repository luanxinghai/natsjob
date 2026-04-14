package datetime

import (
	"natsjob/pkg/strutil"
	"time"
)

const (
	DateFormat         = "2006-01-02"
	DateTimeFormat     = "2006-01-02 15:04:05"
	DateTimeFormatMs   = "2006-01-02 15:04:05.000"
	DateTimeFormatMsss = "2006-01-02 15:04:05.000000"
	TimeFormat         = "15:04:05"
)

func DateTime(now time.Time) string {
	return now.Format(DateTimeFormat)
}
func DateTimeNil(now *time.Time) string {
	if now == nil {
		return ""
	}
	return now.Format(DateTimeFormat)
}
func DateTimeMs(now time.Time) string {
	return now.Format(DateTimeFormatMs)
}

func DateTimeMsNil(now *time.Time) string {
	if now == nil {
		return ""
	}
	return now.Format(DateTimeFormatMs)
}

func Date(now time.Time) string {
	return now.Format(DateFormat)
}

func NowDateTime() string {
	return time.Now().Format(DateTimeFormat)
}

func NowDate() string {
	return time.Now().Format(DateFormat)
}
func NowTime() string {
	return time.Now().Format(TimeFormat)
}

func ParseDateTimeOrNil(dateTime string) *time.Time {
	if dateTime == "" {
		return nil
	}

	formats := []string{DateTimeFormat, DateTimeFormatMs, DateTimeFormatMsss}
	for _, format := range formats {
		if len(dateTime) == len(format) {
			t, err := time.ParseInLocation(format, dateTime, time.Local)
			if err == nil {
				return &t
			}
			return nil
		}
	}

	// 13位时间戳 1769398015557
	if len(dateTime) == 13 {
		timestamp, err := strutil.ToInt64(dateTime)
		if err != nil {
			return nil
		}
		t := time.UnixMilli(timestamp)
		return &t
	}

	return nil
}

func ParseDate(date string) time.Time {
	t, err := time.ParseInLocation(DateFormat, date, time.Local)
	if err != nil {
		return time.Time{}
	}
	return t
}
