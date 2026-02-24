package pojo

import (
	"natsjob/pkg/web/page"
)

type NamespaceQuery struct {
	page.Pagination
}
type NamespaceDto struct {
	Name        string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description string `json:"description" binding:"omitempty,min=1,max=256"`
}

type NamespaceUpdateDto struct {
	ID          string `json:"id" binding:"required"`
	Name        string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description string `json:"description" binding:"omitempty,min=1,max=256"`
}

type NamespaceGetDto struct {
	ID string `json:"id" binding:"required"`
}

type NamespaceRemoveDto struct {
	ID string `json:"id" binding:"required"`
}
type NamespaceVo struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}
