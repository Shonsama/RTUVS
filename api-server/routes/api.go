package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/controllers/app"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/controllers/common"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/middleware"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/services"
)

func SetApiGroupRoutes(router *gin.RouterGroup) {
	
	router.GET("/getAllNodes", common.RetrieveAllROSNodes)
	router.POST("/createNode", common.CreateROSNode)
	router.POST("/editNode", common.EditROSNode)
	router.DELETE("/deleteNode", common.DeleteROSNode)
	router.GET("/getTopicsByNodeID", common.RetrieveTopicByID)
	router.POST("/createTopic", common.CreateTopic)
	router.DELETE("/deleteTopic", common.DeleteTopic)

	authRouter := router.Group("/auth").Use(middleware.JWTAuth(services.AppGuardName))
	{
		authRouter.POST("/auth/info", app.Info)
		authRouter.POST("/auth/logout", app.Logout)
		authRouter.POST("/image_upload", common.ImageUpload)
	}
}
