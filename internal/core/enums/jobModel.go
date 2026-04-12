package enums

type JobModel struct {
	Type    string
	Code    int
	Comment string
	Desc    string
}

var (
	JobModels = struct {
		//Lite  JobModel
		Plus  JobModel
		Max   JobModel
		Pro   JobModel
		Ultra JobModel
	}{
		//Lite:  JobModel{Type: "lite", Code: 1, Comment: "炼气"},
		Plus:  JobModel{Type: "plus", Code: 2, Comment: "轻量"},
		Max:   JobModel{Type: "max", Code: 3, Comment: "基础"},
		Pro:   JobModel{Type: "pro", Code: 4, Comment: "专业"},
		Ultra: JobModel{Type: "ultra", Code: 5, Comment: "客户端"},
	}
)

// 注册表
var allTaskModels = []JobModel{
	//JobModels.Lite,
	JobModels.Plus,
	JobModels.Pro,
	JobModels.Ultra,
}
