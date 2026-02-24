package enums

type JobCategory struct {
	Type    string
	Code    int
	Comment string
	Desc    string
}

var (
	JobCategories = struct {
		Standalone JobCategory
		Broadcast  JobCategory
		Map        JobCategory
		Group      JobCategory
		Agent      JobCategory
	}{
		Standalone: JobCategory{Type: "standalone", Code: 1, Comment: "单机任务"},
		Broadcast:  JobCategory{Type: "broadcast", Code: 2, Comment: "广播任务"},
		Map:        JobCategory{Type: "map", Code: 3, Comment: "Map任务"},
		Group:      JobCategory{Type: "group", Code: 4, Comment: "组任务"},
		Agent:      JobCategory{Type: "agent", Code: 5, Comment: "Agent任务"},
	}
)

func (j JobCategory) IsValid() bool {
	switch j {
	case JobCategories.Standalone,
		JobCategories.Broadcast,
		JobCategories.Map,
		JobCategories.Group,
		JobCategories.Agent:
		return true
	default:
		return false
	}
}
