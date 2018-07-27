var express = require('express');
var static = require('express-static');
var cookieParser = require('cookie-parser');
var server = express();
server.use(cookieParser('lksjdklfjasd'));

var vip = {
    'leo3': 123456
};

server.use('', function (req, res, next) {

    req.secret = 'lksjdklfjasd';

    res.cookie('test', 'leo', {
        signed: true
    });
    res.cookie('test', 'leo');

    console.log(req.signedCookies);


    res.send('ok');


});



server.listen(2731);