var express = require("express");
var querystring=require("querystring");
var bodyParser=require("body-parser");
var exec = require('child_process').exec;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
exec("adb shell mkdir -p /sdcard/wscats", function(err, stdout, stderr){
    exec("adb shell screencap -p /sdcard/wscats/screen.png", function(err, stdout, stderr){
        exec("adb pull /sdcard/wscats/screen.png .", function(err, stdout, stderr){
            console.log("刷新图片");
            exec("adb shell rm -r /sdcard/wscats/", function(err, stdout, stderr){
            });
        });
    });
});




app.post("/jamp", function(req, res){
    res.append("Access-Control-Allow-Origin","*");
    console.log(req.body);
    var t =req.body.len*5.15;
    console.log(t);
    new Promise(function(success){
        exec(`adb shell input swipe 100 100 200 200 ${parseInt(t)}` , function(err, stdout, stderr){
            success()
        });
    }).then(function(){
      return new Promise(function(success){
            //在手机上新建文件夹
            setTimeout(function(){
                exec("adb shell mkdir -p /sdcard/wscats", function(err, stdout, stderr){
                    success()
                });
            },300)
        })
    }).then(function(){
        return new Promise(function(success){
            // 截图
            exec("adb shell screencap -p /sdcard/wscats/screen.png", function(err, stdout, stderr){
                success()
            });
        })
    }).then(function(){
        return new Promise(function(success){
            // 图片上传到电脑
            exec("adb pull /sdcard/wscats/screen.png .", function(err, stdout, stderr){
                success()
            });
        })
    }).then(function(){
        // 删除手机上的文件夹
        exec("adb shell rm -r /sdcard/wscats/", function(err, stdout, stderr){
            res.send("跳完了")
        });
    })
});
app.listen(1444);
console.log("开启");
