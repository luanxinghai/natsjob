package pojo

import "natsjob/pkg/web/page"

type AppQuery struct {
	page.Pagination
	NamespaceId string `json:"namespaceId" binding:"required"`
	Name        string `json:"name"`
}
type AppDto struct {
	Name        string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description string `json:"description" binding:"omitempty,min=1,max=256"`
	NamespaceId string `json:"namespaceId" binding:"required"`
}

type AppUpdateDto struct {
	ID          string `json:"id" binding:"required"`
	Name        string `json:"name" binding:"required,min=1,max=64,alphanumdashplus"`
	Description string `json:"description" binding:"omitempty,min=1,max=256"`
	NamespaceId string `json:"namespaceId" binding:"required"`
}
type AppGetDto struct {
	ID string `json:"id" binding:"required"`
}
type AppRemoveDto struct {
	ID string `json:"id" binding:"required"`
}

type AppVo struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	NamespaceId string `json:"namespaceId"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}
