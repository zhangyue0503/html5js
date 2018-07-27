var express = require('express');
var static  = require('express-static');
var cookieParser = require('cookie-parser');
var server = express();
server.use(cookieParser());

var vip = {
   'leo3':123456
};

server.use('',function(req,res,next){
    // res.cookie('user','leo3',{maxAge:1000*50});
    // console.log(req.cookies);
    res.cookie('test','hehehe',{maxAge:365*24*3600*10});
    res.cookie('password','123456',{maxAge:365*24*3600*10});

    console.log(req.cookies);
    
    next();
    // res.send('ok');
});

server.use('/leo',function(req,res,next){
    // console.log(req.cookies);

    res.send({
        user:req.cookies.user,
        pass:req.cookies.password
    });
});

server.use('/login',function(req,res,next){
    if(vip[req.query.user] == vip.leo3){
        res.send('ok');
    }else{
        res.send('no ok');
    }
    

});


server.use(static('./www'));

server.listen(2731);