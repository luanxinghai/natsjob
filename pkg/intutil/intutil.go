package intutil

func Int64Ptr(v int64) *int64 {
	return &v
}

func Value(seconds *int64) int64 {
	return *seconds
}
