npm install express-session

const express = require('express');
const session = require('express-session');
const app = express();

// 配置 express-session 中间件
app.use(session({
  secret: 'your-secret-key', // 密钥用于签名会话 ID
  resave: false,
  saveUninitialized: true,
}));


// 存储会话数据
app.get('/login', (req, res) => {
    req.session.user = { username: 'john_doe' };
    res.send('Logged in');
  });
  
  // 访问会话数据
  app.get('/profile', (req, res) => {
    if (req.session.user) {
      res.send(`Welcome, ${req.session.user.username}`);
    } else {
      res.send('Not logged in');
    }
  });

  
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.send('Logged out');
      }
    });
  });
  

  const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000, // 设置过期时间为1小时（以毫秒为单位）
  },
}));
