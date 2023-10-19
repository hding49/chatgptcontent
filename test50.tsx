const express = require('express');
const path = require('path');
const fs = require('fs');

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

    // 插入Google Analytics代码到HTML中
    const modifiedHtml = data.replace('</head>', `${googleAnalyticsCode}</head>`);
    res.send(modifiedHtml);
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


可以将Google Analytics的跟踪代码直接放入Node.js服务器文件中，而无需使用模板引擎。你可以使用Node.js的文件系统模块（fs模块）来读取index.html文件，然后在服务器端插入Google Analytics的跟踪代码。以下是如何实现的步骤：

步骤 1: 构建React应用并将静态文件托管在Node.js中
首先，构建你的React应用并将生成的静态文件（通常在build目录下）托管在Node.js中。你可以使用Express.js或任何其他适合你的Node.js服务器框架。

步骤 2: 将Google Analytics跟踪代码放入Node.js文件中
在Node.js的服务器文件中，使用fs模块读取index.html文件，将Google Analytics的跟踪代码插入到<head>标签之前，然后将修改后的HTML内容发送给客户端。以下是一个例子：

在上述代码中，index.html文件被读取并修改，Google Analytics的跟踪代码被插入到</head>标签之前，然后修改后的HTML响应被发送给客户端。

请确保将YOUR_GA_TRACKING_ID替换为你在Google Analytics中获取到的实际跟踪ID。

通过这种方式，Google Analytics的跟踪代码将在服务器端执行，而不是在客户端，从而确保在所有情况下都会被执行，即使用户禁用了JavaScript。