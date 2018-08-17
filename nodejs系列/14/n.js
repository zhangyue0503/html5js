var express = require('express');
var Multer = require('multer');
var static = require('express-static');
var path = require('path');
var fs = require('fs');
var server  = express();
server.listen(2313);

server.use(Multer({dest:'./www'}).any());


server.use('/setFiles',function(req,res){
    // console.log(req.files);
    var newFileName = req.files[0].path+path.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newFileName,function(err){
        if(err){
            console.log(err);
        }else{
            res.send(newFileName);
        }
    });
});

server.use(static('./www'));