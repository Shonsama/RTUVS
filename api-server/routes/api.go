package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/controllers/common"
)

func SetApiGroupRoutes(router *gin.RouterGroup) {
	router.GET("/getAllNodes", common.RetrieveAllROSNodes)
	router.POST("/createNode", common.CreateROSNode)
	router.POST("/editNode/:id", common.EditROSNode)
	router.POST("/deleteNode/:id", common.DeleteROSNode)
	router.GET("/getTopicsByNodeID/:rosNodeID", common.RetrieveTopicByID)
	router.POST("/createTopic", common.CreateTopic)
	router.POST("/deleteTopic/:id", common.DeleteTopic)
}
