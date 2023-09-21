# 使用 Node.js 作为代理服务器基础镜像
FROM node:14 AS proxy

# 设置工作目录
WORKDIR /app/proxy

# 复制代理服务器文件到容器中
COPY . /app/proxy

# 安装代理服务器依赖
RUN npm install

# 启动代理服务器
CMD ["node", "server.js"]


apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 2 # 指定副本数量
  selector:
    app: my-app
    deploymentconfig: my-app
  template:
    metadata:
      labels:
        app: my-app
        deploymentconfig: my-app
    spec:
      containers:
        - name: my-app-frontend
          image: my-app-image:latest # 前端容器镜像
          ports:
            - containerPort: 80 # 前端应用端口
          command: ["npm", "start"] # 前端启动命令
        - name: my-app-proxy
          image: my-app-image:latest # 代理服务器容器镜像
          ports:
            - containerPort: 3000 # 代理服务器端口
