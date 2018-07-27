var express = require('express');
var static  = require('express-static');
var cookieParser = require('cookie-parser');
var server = express();
server.use(cookieParser());


server.use('',function(req,res,next){
    // res.cookie('user','leo3',{maxAge:1000*50});
    console.log(req.cookies);
    
    res.send('ok');
});

server.use(static('./www'));

server.listen(2731);