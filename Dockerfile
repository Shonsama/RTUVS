# 基础镜像
FROM ubuntu:20.04

# 设置时区并选择地理区域
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai
RUN apt-get update && apt-get install -y tzdata && \
    ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure --frontend=noninteractive tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 安装MySQL和Redis
RUN apt-get update && \
    apt-get install -y mysql-server redis-server

# 启动 MySQL 和 Redis 服务，等待 5 秒钟
RUN service mysql start && \
    sleep 5 && \
    service redis-server start && \
    sleep 5 && \
    mysql -e "CREATE DATABASE new_schema"
# 安装Node.js
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

# 设置工作目录
WORKDIR /app

FROM node:latest AS build-web
WORKDIR /app/web
COPY ./web .
RUN npm install && \
    npm run build

FROM golang:latest AS build-api
WORKDIR /app/api-server
COPY ./api-server .
COPY --from=build-web /app/web/dist /app/api-server/static
RUN go mod download && \
    go build .
CMD ["./api-server"]