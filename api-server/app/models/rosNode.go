package models

type ROSNode struct {
	ID
	Name string `json:"name" gorm:"not null;comment:ROSNode Name"`
	IP   string `json:"ip" gorm:"not null;comment:ROSNode IP"`
}
