const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // 代理服务器的端口

// 中间件：允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// 代理路由：接收前端请求并将其转发给真正的 API
app.get('/api', async (req, res) => {
  try {
    // 发出 HTTP 请求到真正的 API
    const response = await axios.get('https://api.example.com' + req.url);

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
