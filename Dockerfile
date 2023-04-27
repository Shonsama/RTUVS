# 基础镜像
FROM ubuntu:20.04

# 安装MySQL和Redis
RUN apt-get update && \
    apt-get install -y mysql-server redis-server

# 设置MySQL和Redis服务
RUN service mysql start && \
    service redis start && \
    mysql -e "CREATE DATABASE go-test"

# 安装Node.js
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

# 设置工作目录
WORKDIR /RATVS

# 安装React应用程序依赖
COPY package*.json ./
RUN npm install

# 将React应用程序构建到/api-server的static文件夹中
RUN npm run build && \
    cp -r build /api-server/static

# 启动/gin项目
CMD ["gin", "-i", "run", "main.go"]
