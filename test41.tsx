const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000; // 指定服务器端口

// 静态文件托管（前端构建文件）
app.use(express.static(path.join(__dirname, 'build')));

// 处理后端路由
app.get('/api/data', (req, res) => {
  // 处理后端逻辑
  res.json({ message: 'Hello from the server!' });
});

// 处理所有其他请求，返回前端应用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



# 使用官方的Node.js镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器中
COPY package*.json ./

# 安装前端依赖
RUN npm install

# 在容器中创建一个名为 "client" 的目录并将前端应用复制到其中
RUN mkdir client
COPY ./client ./client

# 进入前端目录，构建前端代码
WORKDIR /app/client
RUN npm run build

# 返回工作目录
WORKDIR /app

# 复制后端服务器文件到容器中
COPY server.js .

# 暴露服务器端口
EXPOSE 5000

# 启动Node.js服务器
CMD [ "node", "server.js" ]
