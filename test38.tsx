const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // 用于解析请求体

const app = express();
const port = 3000; // 代理服务器的端口

// 使用 bodyParser 中间件来解析请求体
app.use(bodyParser.json());

// 中间件：允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// 代理路由：接收前端 POST 请求并将其转发给真正的 API
app.post('/api', async (req, res) => {
  try {
    // 获取 POST 请求数据
    const requestData = req.body;

    // 发出 HTTP POST 请求到真正的 API
    const response = await axios.post('https://api.example.com' + req.url, requestData);

    // 将真正的 API 响应传递给前端
    res.json(response.data);
  } catch (error) {
    // 处理错误
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Proxy Server Error' });
  }
});

// 启动代理服务器
app.listen(port, () => {
  console.log(`Proxy Server is running on port ${port}`);
});


const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用 bodyParser 中间件来解析请求体
app.use(bodyParser.json());

// 中间件：允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// 创建 Axios 实例并配置基本 URL
const apiInstance = axios.create({
  baseURL: 'https://api.example.com', // 设置真正的 API 的基本 URL
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

// 代理路由：接收前端请求并将其转发给真正的 API
app.post('/api', async (req, res) => {
  try {
    // 获取 POST 请求数据
    const requestData = req.body;

    // 使用 Axios 实例发送 POST 请求
    const response = await apiInstance.post(req.url, requestData);

    // 将真正的 API 响应传递给前端
    res.json(response.data);
  } catch (error) {
    // 处理错误
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Proxy Server Error' });
  }
});

// 启动代理服务器
app.listen(port, () => {
  console.log(`Proxy Server is running on port ${port}`);
});
