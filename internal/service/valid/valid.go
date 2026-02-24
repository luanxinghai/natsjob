package valid

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func ValidationError(errs validator.ValidationErrors, dto interface{}) string {
	fieldMap := toFieldMap(dto)
	return ValidationErrorFiledMap(errs, fieldMap)
}

func ValidationErrorFiledMap(errs validator.ValidationErrors, fieldMap map[string]string) string {
	if len(errs) == 0 {
		return "Parameter validation failed"
	}

	fe := errs[0]
	name, ok := fieldMap[fe.Field()]
	if !ok {
		name = fe.Field()
	}

	switch fe.Tag() {
	case "required":
		return fmt.Sprintf("%s不能为空", name)
	case "min":
		return fmt.Sprintf("%s长度不能小于%s", name, fe.Param())
	case "max":
		return fmt.Sprintf("%s长度不能超过%s", name, fe.Param())
	case "alphanumdashplus":
		return fmt.Sprintf("%s格式错误，只能包含英文字母、数字和中横线，且中横线必须在中间", name)
	case "email":
		return fmt.Sprintf("%s邮箱格式不正确", name)
	case "len":
		return fmt.Sprintf("%s长度必须为%s", name, fe.Param())
	case "numeric":
		return fmt.Sprintf("%s必须是数字", name)
	case "alpha":
		return fmt.Sprintf("%s只能包含字母", name)
	default:
		return fmt.Sprintf("%s验证失败(%s)", name, fe.Tag())
	}
}

// 自动生成字段映射
func toFieldMap(dto interface{}) map[string]string {
	result := make(map[string]string)
	t := reflect.TypeOf(dto)

	// 解除指针
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		jsonTag := field.Tag.Get("json")
		if jsonTag != "" {
			jsonName := strings.Split(jsonTag, ",")[0] // 去除选项部分
			descTag := field.Tag.Get("desc")           // 假设使用自定义desc标签存储中文描述
			if descTag != "" {
				result[jsonName] = descTag
			} else {
				// 如果没有描述标签，则可以根据需要设定默认值
				result[jsonName] = field.Name
			}
		}
	}
	return result
}

// alphanumDashValidator 验证只能包含字母、数字、中横线
func alphanumDashValidator(fl validator.FieldLevel) bool {
	return regexp.MustCompile(`^[a-zA-Z0-9-]+$`).MatchString(fl.Field().String())
}

// alphanumDashPlusValidator 验证只能包含字母、数字、中横线，且中横线必须在中间
func alphanumDashPlusValidator(fl validator.FieldLevel) bool {
	return regexp.MustCompile(`^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$`).MatchString(fl.Field().String())
}

// 注册验证器
func SetupValidators() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("alphanumdash", alphanumDashValidator)
		v.RegisterValidation("alphanumdashplus", alphanumDashPlusValidator)
	}
}
