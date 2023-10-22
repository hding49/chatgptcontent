const express = require('express');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

const app = express();
const port = 3000;

// 设置静态文件托管
app.use(express.static(path.join(__dirname, 'build')));

// 中间件：添加Google Analytics跟踪代码到响应中
app.use((req, res, next) => {
  // 读取index.html文件内容
  const indexHtmlPath = path.join(__dirname, 'build', 'index.html');
  fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Google Analytics跟踪代码
    const googleAnalyticsCode = `
      <!-- Google Analytics Tracking Code -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR_GA_TRACKING_ID');
      </script>
      <!-- End Google Analytics Tracking Code -->
    `;

    // 使用Mustache将Google Analytics代码插入到HTML中
    const renderedHtml = mustache.render(data, { googleAnalyticsCode });

    // 发送响应
    res.send(renderedHtml);
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
