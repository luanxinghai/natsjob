package pojo

type User struct {
	ID   uint   `gorm:"primaryKey" json:"ids"`
	Name string `gorm:"size:50" json:"name"`
}
