package domain

import (
	"natsjob/pkg/json"
	"sync/atomic"
)

type AtomicInt64 struct {
	atomic.Int64
}

// 实现 json.Marshaler
func (ai *AtomicInt64) MarshalJSON() ([]byte, error) {
	return json.Marshal(ai.Load())
}

// 实现 json.Unmarshaler（可选，如果你需要从 JSON 反序列化）
func (ai *AtomicInt64) UnmarshalJSON(data []byte) error {
	var v int64
	if err := json.Unmarshal(data, &v); err != nil {
		return err
	}
	ai.Store(v)
	return nil
}
