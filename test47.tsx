const axios = require('axios');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const authorizationCode = 'AUTHORIZATION_CODE';
const tokenEndpoint = 'https://pingfederate-server/pf/oauth/issuer/token';

const getToken = async () => {
  try {
    const response = await axios.post(tokenEndpoint, {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      redirect_uri: 'https://your-redirect-uri.com',
    });

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
    // 使用访问令牌进行API请求
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

getToken();


// Axios 拦截器，用于将 Session 中的 Token 放入请求头
apiAxios.interceptors.request.use(config => {
    // 从 Session 中获取 Token
    const token = req.session.token; // 假设你的 Token 存储在 req.session.token 中
  
    // 将 Token 放入请求头
    config.headers.Authorization = `Bearer ${token}`;
  
    return config;
  }, error => {
    return Promise.reject(error);
  });