const express = require('express');
const router = express.Router();
const request = require("request");
var cheerio = require('cheerio');



router.get('/', function(req, res, next) {
    res.append("Access-Control-Allow-Origin","*");
    console.log(req.body);
    /*request.post({
        url:"http://172.28.228.59:8080/api/v2/cloud_defence_service",
        data:{
        }
    },function optionalCallback(err, httpResponse, body){});*/
    res.send("ok")
});



module.exports = router;