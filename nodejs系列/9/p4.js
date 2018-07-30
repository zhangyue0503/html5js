var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var Multer = require('multer');
var fs = require('fs');
var path = require('path');

var server = express();

server.listen(2173);

server.use(Multer({dest:'./save/'}).any());
server.post('',function(req,res){
    fs.rename(req.files[0].path,req.files[0].path+path.parse(req.files[0].originalname).ext,function(err){
        if(err){
            console.log(err);
        }else{
            res.send('上传成功');
        }
    });

});