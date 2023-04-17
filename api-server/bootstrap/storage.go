package bootstrap

import (
	"github.com/jassue/go-storage/kodo"
	"github.com/jassue/go-storage/local"
	"github.com/jassue/go-storage/oss"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/global"
)

func InitializeStorage() {
	_, _ = local.Init(global.App.Config.Storage.Disks.Local)
	_, _ = kodo.Init(global.App.Config.Storage.Disks.QiNiu)
	_, _ = oss.Init(global.App.Config.Storage.Disks.AliOss)
}
