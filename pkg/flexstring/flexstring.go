package flexstring

import (
	"fmt"
	"natsjob/pkg/json"
	"natsjob/pkg/strutil"
	"strconv"

	"github.com/bytedance/sonic"
)

type FlexString string

func (f *FlexString) UnmarshalJSON(data []byte) error {
	var v interface{}
	if err := json.Unmarshal(data, &v); err != nil {
		return err
	}

	switch val := v.(type) {
	case string:
		*f = FlexString(val)
	case float64:
		*f = FlexString(strconv.FormatFloat(val, 'f', -1, 64))
	case int:
		*f = FlexString(strconv.Itoa(val))
	case int64:
		*f = FlexString(strconv.FormatInt(val, 10))
	default:
		*f = FlexString(fmt.Sprintf("%v", val))
	}
	return nil
}

func (f FlexString) MarshalJSON() ([]byte, error) {
	return sonic.Marshal(string(f))
}

func (f FlexString) ToString() string {
	return string(f)
}
func (f FlexString) ToInt64() int64 {
	return strutil.ToInt64OrZero(string(f))
}
