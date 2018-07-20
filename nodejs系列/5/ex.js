var express = require('express');
var bodyParser = require('./bodyp');
var server = express();

server.use(bodyParser.urlencoded({}));

server.listen(1273);
server.use('', function (req, res, next) {
    console.log(req.body);
    // console.log('有人来了');
    // console.log('query :', req.query);
    // console.log('我是use1');
    // req.userid = 10;
    // next();
});

server.use('', function (req, res) {
    // console.log('我是use2');
    console.log(req.userid);
    
});


// server.get('',function(req,res){
//     console.log('get了');
// });

// server.post('',function(req,res){
//     console.log('post了');
// });