var express = require('express');
var static = require('express-static');
var fs = require('fs');

var server = express();
server.listen(2130);

server.use(static('./jjj'));
server.use('',function(req,res){
    fs.readFile('./jjj/404.html'+req.path,function(err,data){
        res.write(data);
            res.end();
    });
});