package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {

	// 创建HTTP服务器
	r := gin.Default()

	// 启动HTTP服务器
	err := r.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
