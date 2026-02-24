package pojo

type ConsoleClientRegNsDto struct {
	Namespace string `json:"namespace" binding:"required"`
}

type ConsoleClientRegAppDto struct {
	AppName   string `json:"appName" binding:"required"`
	Namespace string `json:"namespace" binding:"required"`
}
