# RATVS-ROS-Topic-Unified-Visualization-System

[![GitHub stars](https://img.shields.io/github/stars/Shonsama/RATVS-ROS-Topic-Unified-Visualization-System.svg)](https://github.com/Shonsama/RATVS-ROS-Topic-Unified-Visualization-System/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ROS version](https://img.shields.io/badge/ROS-Kinetic-blue.svg)](http://wiki.ros.org/kinetic)

The ROS Topic Unified Visualization System (RTUVS) is designed to provide unified access to topic information from multiple Robot Operating System (ROS) instances. 

Using the IP address and topic name, RTUVS allows users to subscribe to topic information and transmit it to a MQTT broker for centralized management. The topic information can be displayed in real-time on a web-based user interface, enabling users to easily monitor and visualize data from multiple ROS instances. RTUVS is an efficient and user-friendly solution for managing ROS topic information across multiple systems.
Project Objective Plan Execution Status:

## API

/getAllNodes GET

/createNode POST req: Node

/editNode POST req: Node

/deleteNode DELETE

/getTopicsByNodeName GET req: name

/createTopic POST req: Topic

/deleteTopic DELETE

/rtspToWeb ws

/topicInfo ws

## Todo

### V0: April

- ✅ Build the frontend framework - Next.js
- ✅ Add ROS node - frontend
- ✅ Add dashboard - frontend
- ✅ Build the backend web - Gin/Redis
- ✅ Complete API - node crud
- ✅ Complete API - dashboard crud
- 📝 TopicContent
- 📝 Integrate
- 📝 Test

### V1: May

- 📝 MQTT Server
- 📝 RTSP Server
