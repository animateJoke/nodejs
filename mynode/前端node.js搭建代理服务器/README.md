
# node.js搭建前端代理服务器


关键代码

```javascript
var serverUrl='https://private-e91fc7-animate.apiary-mock.com/';

app.use('/', function(req, res) {
    var url = serverUrl + req.url;
    console.log("request url==>",url);
    req.pipe(request(url)).pipe(res);
});
```
当访问 http://localhost:8081/group时；node会直接访问https://private-e91fc7-animate.apiary-mock.com/group;并把结果返回；解决前后端分离时，ajax跨域问题；