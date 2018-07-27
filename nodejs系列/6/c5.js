var express = require('express');
var static  = require('express-static');
var cookieParser = require('cookie-parser');
var server = express();
server.use(cookieParser());

var vip = {
   'leo3':123456
};

server.use('',function(req,res,next){

    var json = req.cookies;
    for (let i in json) {
        res.clearCookie(i);
    }

    // res.clearCookie('test');
    // res.cookie('test','leo');


    // res.cookie('user','leo3',{maxAge:1000*50});
    // console.log(req.cookies);
    // res.cookie('test','hehehe',{maxAge:365*24*3600*10});
    // res.cookie('password','123456',{maxAge:365*24*3600*10});

    // console.log(req.cookies);
    
    res.send('ok');

    // res.send('ok');
});



// server.use(static('./www'));

server.listen(2731);