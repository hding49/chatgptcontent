const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Change this to the base URL of your API
    createProxyMiddleware({
      target: 'http://api.example.com', // Change this to your API server's URL
      changeOrigin: true,
    })
  );
};


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.example.com', // Replace with your API URL
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*', // Adjust this header based on your server's CORS settings
    'Content-Type': 'application/json', // Adjust headers as needed
  },
});

export default instance;


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://your-react-app-domain.com',
  credentials: true,
}));

// ...rest of your server setup
