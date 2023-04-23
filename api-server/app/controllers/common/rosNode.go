package common

import (
	"github.com/gin-gonic/gin"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/request"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/response"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/services"
)

func CreateROSNode(c *gin.Context) {
	var form request.ROSNode
	if err := c.ShouldBind(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	outPut, err := services.ROSNodeService.CreateROSNode(form)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, outPut)
}

func RetrieveAllROSNodes(c *gin.Context) {
	rosNodes, err := services.ROSNodeService.RetrieveAllROSNodes()
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, rosNodes)
}

func RetrieveROSNodeByID(c *gin.Context) {
	id := c.Param("id")
	rosNode, err := services.ROSNodeService.RetrieveROSNodeByID(id)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, rosNode)
}

func DeleteROSNode(c *gin.Context) {
	id := c.Param("id")
	err := services.ROSNodeService.DeleteROSNode(id)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, nil)
}

func EditROSNode(c *gin.Context) {
	id := c.Param("id")
	var form request.ROSNode
	if err := c.ShouldBind(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	rosNode, err := services.ROSNodeService.EditROSNode(id, form)
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, rosNode)
}
