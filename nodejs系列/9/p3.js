var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var Multer = require('multer');
var fs = require('fs');

var server = express();

server.listen(2173);

server.use(Multer({dest:'./save/'}).any());
server.post('',function(req,res){
    res.send('ok');
});