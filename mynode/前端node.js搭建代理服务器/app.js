const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
// Add middleware for http proxying
const apiProxy = proxy('/api', { target: 'https://private-906dd-millken.apiary-mock.com',changeOrigin: true });
app.use('/api/*', apiProxy);//api子目录下的都是用代理
app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});