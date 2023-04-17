package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/controllers/app"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/controllers/common"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/middleware"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/services"
)

func SetApiGroupRoutes(router *gin.RouterGroup) {
	router.POST("/auth/register", app.Register)
	router.POST("/auth/login", app.Login)

	authRouter := router.Group("").Use(middleware.JWTAuth(services.AppGuardName))
	{
		authRouter.POST("/auth/info", app.Info)
		authRouter.POST("/auth/logout", app.Logout)
		authRouter.POST("/image_upload", common.ImageUpload)
	}
}
