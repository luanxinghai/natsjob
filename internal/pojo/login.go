package pojo

type LoginPlusDto struct {
	UserId string `json:"userId" binding:"required"`
	Time   int64  `json:"time" binding:"required"`
	Sign   string `json:"sign" binding:"required"`
}

type LoginVo struct {
	Token string `json:"token"`
}
