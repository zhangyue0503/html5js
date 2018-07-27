var express = require('express');
var static  = require('express-static');

var server = express();
server.use('',function(req,res,next){
    res.cookie('user','leo3',{path:'/aaa',maxAge:10000});
    res.send('ok');
});

server.use(static('./www'));

server.listen(2731);