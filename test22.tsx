# 使用 nodejs:16-ubi8 作为基础镜像
FROM nodejs:16-ubi8

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器
COPY package.json package-lock.json /app/

# 安装依赖
RUN npm install

# 复制应用程序代码到容器
COPY . /app/

# 构建应用
RUN npm run build

# 设置启动命令
CMD ["npm", "start"]
