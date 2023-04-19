package services

import (
	"errors"

	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/request"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/models"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/global"
)

type rosNodeService struct {
}

var ROSNodeService = new(rosNodeService)

// Create
func (rosNodeService *rosNodeService) CreateROSNode(params request.ROSNode) (rosNode models.ROSNode, err error) {
	var result = global.App.DB.Where("ip = ?", params.IP).Select("id").First(&models.ROSNode{})
	if result.RowsAffected != 0 {
		err = errors.New("手机号已存在")
		return
	}
	rosNode = models.ROSNode{Name: params.Name, IP: params.IP}
	err = global.App.DB.Create(&rosNode).Error
	return
}

// RetrieveAllROSNodes returns all ROS nodes from the database
func (rosNodeService *rosNodeService) RetrieveAllROSNodes() ([]models.ROSNode, error) {
	var rosNodes []models.ROSNode
	err := global.App.DB.Find(&rosNodes).Error
	if err != nil {
		return nil, err
	}
	return rosNodes, nil
}

// RetrieveROSNodeByID returns a ROS node from the database by ID
func (rosNodeService *rosNodeService) RetrieveROSNodeByID(id string) (models.ROSNode, error) {
	var rosNode models.ROSNode
	err := global.App.DB.Where("id = ?", id).First(&rosNode).Error
	if err != nil {
		return models.ROSNode{}, err
	}
	return rosNode, nil
}

// DeleteROSNode deletes a ROS node from the database by ID
func (rosNodeService *rosNodeService) DeleteROSNode(id string) error {
	var rosNode models.ROSNode
	err := global.App.DB.Where("id = ?", id).First(&rosNode).Error
	if err != nil {
		return err
	}
	err = global.App.DB.Delete(&rosNode).Error
	if err != nil {
		return err
	}
	return nil
}

// EditROSNode updates a ROS node in the database by ID
func (rosNodeService *rosNodeService) EditROSNode(id string, params request.ROSNode) (models.ROSNode, error) {
	var rosNode models.ROSNode
	err := global.App.DB.Where("id = ?", id).First(&rosNode).Error
	if err != nil {
		return models.ROSNode{}, err
	}

	rosNode.Name = params.Name
	rosNode.IP = params.IP

	err = global.App.DB.Save(&rosNode).Error
	if err != nil {
		return models.ROSNode{}, err
	}

	return rosNode, nil
}
