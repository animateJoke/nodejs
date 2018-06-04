const express=require("express");
const router = express.Router();
const bodyParser=require("body-parser");
const request = require('request');

const app=express();
app.use(bodyParser.urlencoded({
    extended: false
}));

//目标服务器的地址
var serverUrl='https://private-e91fc7-animate.apiary-mock.com/';

app.use('/', function(req, res) {
    var url = serverUrl + req.url;
    console.log("request url==>",url);
    req.pipe(request(url)).pipe(res);
});

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/files'));
app.use(express.static('uploads'));

app.use("/group",require("./router/home"));
var server = app.listen(8081,"localhost", function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});