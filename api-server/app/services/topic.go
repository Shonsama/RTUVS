package services

import (
	"errors"

	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/request"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/models"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/global"
)

type topicService struct {
}

var TopicService = new(topicService)

// Create
func (topicService *topicService) CreateTopic(params request.Topic) (topic models.Topic, err error) {
	var result = global.App.DB.Where("name = ?", params.Name).Select("id").First(&models.Topic{})
	if result.RowsAffected != 0 {
		err = errors.New("手机号已存在")
		return
	}
	topic = models.Topic{Name: params.Name, Type: params.Type}
	err = global.App.DB.Create(&topic).Error
	return
}

// RetrieveAllTopics returns all ROS nodes from the database
func (topicService *topicService) RetrieveAllTopics() ([]models.Topic, error) {
	var topics []models.Topic
	err := global.App.DB.Find(&topics).Error
	if err != nil {
		return nil, err
	}
	return topics, nil
}

// RetrieveTopicByID returns a ROS node from the database by ID
func (topicService *topicService) RetrieveTopicByID(id string) (models.Topic, error) {
	var topic models.Topic
	err := global.App.DB.Where("rosNodeID = ?", id).First(&topic).Error
	if err != nil {
		return models.Topic{}, err
	}
	return topic, nil
}

// DeleteTopic deletes a ROS node from the database by ID
func (topicService *topicService) DeleteTopic(id string) error {
	var topic models.Topic
	err := global.App.DB.Where("id = ?", id).First(&topic).Error
	if err != nil {
		return err
	}
	err = global.App.DB.Delete(&topic).Error
	if err != nil {
		return err
	}
	return nil
}

// EditTopic updates a ROS node in the database by ID
func (topicService *topicService) EditTopic(id string, params request.Topic) (models.Topic, error) {
	var topic models.Topic
	err := global.App.DB.Where("id = ?", id).First(&topic).Error
	if err != nil {
		return models.Topic{}, err
	}

	topic.Name = params.Name
	topic.Type = params.Type

	err = global.App.DB.Save(&topic).Error
	if err != nil {
		return models.Topic{}, err
	}

	return topic, nil
}
