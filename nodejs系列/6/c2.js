var express = require('express');
var static  = require('express-static');

var server = express();
server.use('',function(req,res,next){
    res.cookie('user','leo3',{maxAge:1000*60*60*24});
    
    res.send('ok');
});

server.use(static('./www'));

server.listen(2731);