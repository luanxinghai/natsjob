package page

type Pagination struct {
	Current int `json:"current" form:"current" binding:"omitempty,min=0"`
	Size    int `json:"size" form:"size" binding:"omitempty,min=1,max=500"`
}

type PageResult struct {
	List    interface{} `json:"list"`
	Total   int64       `json:"total"`
	Current int         `json:"current"`
	Size    int         `json:"size"`
}

// GetPage 获取页码（默认第一页）
func (p *Pagination) GetCurrent() int {
	if p.Current <= 0 {
		return 0
	}
	return p.Current - 1
}

// GetLimit 获取每页数量（默认10条）
func (p *Pagination) GetSize() int {
	if p.Size <= 0 {
		return 10
	}
	return p.Size
}

// GetOffset 获取偏移量
func (p *Pagination) GetOffset() int {
	return p.GetCurrent() * p.GetSize()
}
