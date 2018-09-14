var express = require('express');
var static = require('express-static');
var ejs = require('ejs');

var server = express();

server.listen(2333);

server.use('/h.html',(req,res)=>{
    ejs.renderFile('./1.ejs',{a:20,arr:['apply','pear','banana'],classN:'aaa',json:{a:'bbb'}},function(err,data){
        res.send(data);
    });
});

server.use(static('./'));