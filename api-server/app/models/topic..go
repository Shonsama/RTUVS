package models

type Topic struct {
	ID
	Name      string `json:"Name" gorm:"not null;comment:Topic Name"`
	ROSNodeID string `json:"ROSNodeID" gorm:"not null;comment:Topic ROS Node"`
	Type      string `json:"type" gorm:"not null;comment:Topic Type 1table  2Video"`
	Timestamps
}