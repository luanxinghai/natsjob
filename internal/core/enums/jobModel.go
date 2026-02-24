package enums

import "fmt"

type JobModel struct {
	Type    string
	Code    int
	Comment string
	Desc    string
}

var (
	JobModels = struct {
		Lite  JobModel
		Plus  JobModel
		Max   JobModel
		Pro   JobModel
		Ultra JobModel
	}{
		Lite:  JobModel{Type: "lite", Code: 1, Comment: "炼气"},
		Plus:  JobModel{Type: "plus", Code: 2, Comment: "筑基"},
		Max:   JobModel{Type: "max", Code: 3, Comment: "金丹"},
		Pro:   JobModel{Type: "pro", Code: 4, Comment: "元婴"},
		Ultra: JobModel{Type: "ultra", Code: 5, Comment: "道祖"},
	}
)

// 注册表
var allTaskModels = []JobModel{
	JobModels.Lite,
	JobModels.Plus,
	JobModels.Pro,
	JobModels.Ultra,
}

func ParseTaskModel(s string) (*JobModel, error) {
	for _, t := range allTaskModels {
		if t.Type == s {
			return &t, nil
		}
	}
	return nil, fmt.Errorf("invalid job_service type: %s", s)
}

func ParseTaskTypeByCode(code int) (*JobModel, error) {
	for _, t := range allTaskModels {
		if t.Code == code {
			return &t, nil
		}
	}
	return nil, fmt.Errorf("invalid job_service model code: %d", code)
}
