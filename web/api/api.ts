import { ROSNode, Topic } from './types'
// 获取所有节点
export const getAllNodes = () => {
  return fetch('/getAllNodes').then(response => response.json())
}

// 创建节点
export const createNode = (node: ROSNode) => {
  return fetch('/createNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  }).then(response => response.json())
}

// 编辑节点
export const editNode = (node: ROSNode) => {
  return fetch('/editNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  }).then(response => response.json())
}

// 删除节点
export const deleteNode = (id:String) => {
  return fetch(`/deleteNode?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

// 根据节点名称获取话题列表
export const getTopicsByNodeName = (name:String) => {
  return fetch(`/getTopicsByNodeName?name=${name}`).then(response => response.json())
}

// 创建话题
export const createTopic = (topic:Topic) => {
  return fetch('/createTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topic)
  }).then(response => response.json())
}

// 删除话题
export const deleteTopic = (id:String) => {
  return fetch(`/deleteTopic?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}


