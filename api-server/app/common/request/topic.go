package request

type Topic struct {
	Name      string `form:"name" json:"name" binding:"required"`
	ROSNodeID string `form:"rosNodeID" json:"rosNodeID" binding:"required"`
	Type      string `form:"type" json:"type" binding:"required"`
}

func (topic Topic) GetMessages() ValidatorMessages {
	return ValidatorMessages{
		"name.required":      "Name could not be empty",
		"type.required":      "Type could not be empty",
		"rosNodeID.required": "Type could not be empty",
	}
}
