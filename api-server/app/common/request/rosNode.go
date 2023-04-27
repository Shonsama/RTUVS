package request

type ROSNode struct {
	ID   uint   `form:"id" json:"id"`
	Name string `form:"name" json:"name" binding:"required"`
	IP   string `form:"ip" json:"ip" binding:"required"`
}

func (rosNode ROSNode) GetMessages() ValidatorMessages {
	return ValidatorMessages{
		"name.required": "Name could not be empty",
		"ip.required":   "IP could not be empty",
	}
}
