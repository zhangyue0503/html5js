var express = require('express');
var static = require('express-static');

var server  = express();
var arr = [];
server.listen(2123);

server.use('/setMsg',function(req,res){
    arr.push(req.query);
    console.log(arr);
    res.send('ok');
});

server.use('/getMsg',function(req,res){
    res.send(arr);
});

server.use(static('./lib'));