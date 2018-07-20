var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.urlencoded({}));

server.listen(1273);

server.use('/leo', function (req, res, next) {

    if(req.body.user == 'leo' && req.body.pass == '123456'){
        res.send('ok');
    }else{
        res.send('no ok');
    }

    // res.send({a:10});
    // res.write({a:10});
    // res.end();

    // console.log(req.body);
    // console.log('有人来了');
    // console.log('query :', req.query);
    // console.log('我是use1');
    // req.userid = 10;
    // next();
});

server.use(static('./www'));


// server.use('', function (req, res) {
//     // console.log('我是use2');
//     console.log(req.userid);
    
// });


// server.get('',function(req,res){
//     console.log('get了');
// });

// server.post('',function(req,res){
//     console.log('post了');
// });