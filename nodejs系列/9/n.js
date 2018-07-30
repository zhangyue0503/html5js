var express = require('express');
var static = require('express-static');
var fs = require('fs');

var server = express();
server.listen(2130);

server.use('/jjj',function(req,res,next){
    fs.readFile('./jjj'+req.path,function(err,data){
        if(err){
            // console.log(err);
            // fs.readFile('./jjj/404.html',function(err,data){
            //     res.write(data);
            //     res.end();
            // })
            next();
        }else{
            res.write(data);
            res.end();
        }
    });
});

server.use('/*',function(req,res){
    fs.readFile('./jjj/404.html'+req.path,function(err,data){
        res.write(data);
            res.end();
    });
});