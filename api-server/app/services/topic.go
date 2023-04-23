package services

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/common/request"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/app/models"
	"github.com/shonsama/RATVS-ROS-Topic-Unified-Visualization-System/api-server/global"
)

type topicService struct {
}

var TopicService = new(topicService)

const topicCacheKeyPre = "media:"

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
func (topicService *topicService) RetrieveTopicByID(rosNodeID string) ([]models.Topic, error) {
	var topics []models.Topic
	err := global.App.DB.Where("rosNodeID = ?", rosNodeID).Find(&topics).Error
	if err != nil {
		return nil, err
	}
	return topics, nil
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

func (topicService *topicService) RetrieveMessagesByTopicName(topicName string) ([]models.Message, error) {
	// 通过 Redis 客户端获取指定 Topic 对应的所有 Message
	cacheKey := topicCacheKeyPre + topicName
	values, err := global.App.Redis.LRange(context.Background(), cacheKey, 0, -1).Result()
	if err != nil {
		// 处理 Redis 错误
		return nil, err
	}

	messages := make([]models.Message, len(values))

	for i, value := range values {
		// 将 value 解析为 Message 对象
		message := models.Message{}
		err = json.Unmarshal([]byte(value), &message)
		if err != nil {
			// 处理 JSON 解析错误
			return nil, err
		}
		messages[i] = message
	}

	return messages, nil

}
