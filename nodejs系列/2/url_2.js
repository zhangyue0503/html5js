var http = require('http');
urlLib = require('url');
querystring = require('querystring');

http.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin','*');

    var json = urlLib.parse(req.url,true).query;
    if(json.user == 'leo' && json.pass == '123456'){
        res.write('OK');
    }else{
        res.write('No');
    }

    res.end();

}).listen(8010);