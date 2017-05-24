/**
 * Created by zhangyue on 2017/5/24.
 */

var https = require('https');
var fs = require('fs');

var options = {
	key:fs.readFileSync('./server.key'),
	cert:fs.readFileSync('./server.crt')
};

var server = https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
});

server.listen(8000);
