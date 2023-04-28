import { ROSNode, Topic } from './types'
// 获取所有节点
const url = 'http://localhost:8888'
export const getAllNodes = () => {
  return fetch(url + '/getAllNodes').then(response => response.json())
}

// 创建节点
export const createNode = (node: ROSNode) => {
  return fetch(url + '/createNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  }).then(response => response.json())
}

// 编辑节点
export const editNode = (node: ROSNode) => {
  return fetch(`${url}/editNode/${node.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  }).then(response => response.json())
}

// 删除节点
export const deleteNode = (id:String) => {
  return fetch(`${url}/deleteNode/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

// 根据节点名称获取话题列表
export const getTopicsByNodeID = (id:String) => {
  return fetch(`${url}/getTopicsByNodeID/${id}`).then(response => response.json())
}

// 创建话题
export const createTopic = (topic:Topic) => {
  return fetch(url + '/createTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topic)
  }).then(response => response.json())
}

// 删除话题
export const deleteTopic = (id:String) => {
  return fetch(`${url}/deleteTopic/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}


