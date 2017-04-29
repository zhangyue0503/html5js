/**
 * Created by zhangyue on 2017/4/28.
 */

var http = require('http');
var server = http.createServer(function(req,res){
	var body = 'Hello World';
	res.setHeader('Content-Length',body.length);
	res.setHeader('Content-Type','text/html');
	res.statusCode = 200;
	res.end(body);
});
server.listen(3000);


