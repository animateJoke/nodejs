const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const multer = require('multer');
const mysql=require("mysql");
const querystring=require("querystring");
const url=require("url");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var storage = multer.diskStorage({
    // 上传文件夹
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    // 保存的文件名字
    filename: function (req, file, cb) {
        var str=Date.now() + "-" + file.originalname;
        connection.query('update `userinfo` set ? where id=3',{
            img:str
        }, function(error, results, fields) {
            if(error) throw error;
        });
        cb(null, str)

    }
});
var upload = multer({
    storage: storage
});

app.use(express.static(__dirname + '/files'));
app.use(express.static('uploads'));

//录入信息
app.post("/info",function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    connection.query('insert into `userinfo` set ?',req.body, function(error, results, fields) {
        if(error) throw error;
        res.send("成功")
    });
});

//上传图片
app.post("/img",upload.single('img'),function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    res.send('获取图片');
});

//获取所有信息
app.get("/",function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    var params = querystring.parse(url.parse(req.url).query);
    connection.query('select * from `userinfo` where name like "%'+params.name+'%"', function(error, results, fields) {
        if(error) throw error;
        res.json(results)
    });
});
// 获取头像图片路径
app.get("/getImg",function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    connection.query('select * from `userinfo` where id=3',req.body, function(error, results, fields) {
        if(error) throw error;
        res.json(results)
    });
});

app.get("/gethtml",function(req,res){
        res.append("Access-Control-Allow-Origin", "*");
        connection.query('select * from `html`', function(error, results, fields) {
            if(error) throw error;
            res.json(results)
        });
    }

)
app.listen(7676);
console.log("开启服务器");
