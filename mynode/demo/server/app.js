const express=require("express");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const app=express();

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

connection.connect();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post("/savehtml",function(req,res){
    console.log(req.body);
    res.append("Access-Control-Allow-Origin", "*");
    connection.query("insert into html set ?",req.body,function(){
        res.send("ok")
    })
});
app.get("/gethtml",function(req,res){

});

app.listen(5656);
console.log("开启服务器");