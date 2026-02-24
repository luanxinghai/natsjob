package json

import (
	"github.com/bytedance/sonic"
)

func MarshalStr(v interface{}) (string, error) {
	bytes, err := sonic.Marshal(v)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}
func Marshal(v interface{}) ([]byte, error) {
	return sonic.Marshal(v)
}

func MustMarshal(v interface{}) string {
	s, err := MarshalStr(v)
	if err != nil {
		panic("jsonutil.MustMarshal failed: " + err.Error())
	}
	return s
}

func UnmarshalStr(s string, v interface{}) error {
	return sonic.Unmarshal([]byte(s), v)
}

func Unmarshal(buf []byte, v interface{}) error {
	return sonic.Unmarshal(buf, v)
}

func PrettyMarshal(v interface{}) (string, error) {
	bytes, err := sonic.Marshal(v)
	if err != nil {
		return "", err
	}
	var out any
	if err := sonic.Unmarshal(bytes, &out); err != nil {
		return "", err // 理论上不会发生
	}
	prettyBytes, err := sonic.MarshalIndent(out, "", "  ")
	if err != nil {
		return "", err
	}
	return string(prettyBytes), nil
}
