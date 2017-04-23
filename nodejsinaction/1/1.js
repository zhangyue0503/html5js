/**
 * Created by zhangyue on 2017/4/17.
 */

var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello world\n');
});
server.listen(3000);
console.log('Server running at http://localhost:3000/');