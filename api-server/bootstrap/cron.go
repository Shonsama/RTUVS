package bootstrap

import (
	"fmt"
	"time"

	"github.com/robfig/cron/v3"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/global"
)

func InitializeCron() {
	global.App.Cron = cron.New(cron.WithSeconds())

	go func() {
		global.App.Cron.AddFunc("0 0 2 * * *", func() {
			fmt.Println(time.Now())
		})
		global.App.Cron.Start()
		defer global.App.Cron.Stop()
		select {}
	}()
}
