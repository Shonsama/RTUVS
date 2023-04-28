package models

type Topic struct {
	ID
	Name      string    `json:"name" gorm:"not null;comment:Topic Name"`
	ROSNodeID uint      `json:"rosNodeID" gorm:"not null;comment:Topic ROS Node"`
	Type      string    `json:"type" gorm:"not null;comment:Topic Type 1table 2Video"`
	Content   []Message `json:"content" gorm:"-"`
}

type Message struct {
	Value string `json:"value" gorm:"-"`
	Time  string `json:"time" gorm:"-"`
}
