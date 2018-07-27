var jade = require('jade');
var fs = require('fs');
var http = require('http')

http.createServer(function(req,res){
    var str = jade.renderFile('./8.jade',{pretty:true}); 
    res.write(str);
    res.end();
}).listen(2133);

