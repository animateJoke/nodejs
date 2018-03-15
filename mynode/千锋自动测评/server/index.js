const express=require("express");
const request=require("request");
const app = express();

app.post('/', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");

    res.send("111")
});

app.listen(7890);
console.log("开启服务器");