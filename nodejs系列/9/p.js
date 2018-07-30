var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var multer = require('multer');

var server = express();

server.listen(2173);

server.use(bodyParser.urlencoded({}));
server.post('',function(req,res){
    console.log(req.body);
});