var jade = require('jade');
var fs = require('fs');
var express = require('express');
var static = require('express-static');

var server = express();


server.use('/search',function(req,res){
    var allName = req.path;
    var str = jade.renderFile('./jade/1.jade',{pretty:true,titleName:'您搜索的歌曲是'+allName.substring(1),mp3Name:allName.substring(1)+'.mp3',srcUrl:'',mp3Url:'./../'+allName.substring(1)+'.mp3'});
    res.send(str);
});
server.listen(2813);

server.use(static('./mp3/'))


