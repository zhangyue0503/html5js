/**
 * Created by zhangyue on 2017/5/14.
 */

var http = require('http'),
	cp = require('child_process');

http.createServer(function(req,res){
	var child = cp.fork(__filename,[req.url.substring(1)]);
	child.on('message',function(m){
		res.end(m.result+'\n');
	});
}).listen(8000);
