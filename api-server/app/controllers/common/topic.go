package common

import (
	"github.com/gin-gonic/gin"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/request"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/response"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/services"
)

func CreateTopic(c *gin.Context) {
	var form request.Topic
	if err := c.ShouldBind(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	outPut, err := services.TopicService.CreateTopic(form)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, outPut)
}
func RetrieveAllTopics(c *gin.Context) {
	topic, err := services.TopicService.RetrieveAllTopics()
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, topic)
}

func RetrieveTopicByID(c *gin.Context) {
	id := c.Param("id")
	topic, err := services.TopicService.RetrieveTopicByID(id)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, topic)
}

func DeleteTopic(c *gin.Context) {
	id := c.Param("id")
	err := services.TopicService.DeleteTopic(id)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, nil)
}

func EditTopic(c *gin.Context) {
	id := c.Param("id")
	var form request.Topic
	if err := c.ShouldBind(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	topic, err := services.TopicService.EditTopic(id, form)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, topic)
}
