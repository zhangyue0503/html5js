/**
 * Created by zhangyue on 2017/5/24.
 */

var tls = require('tls');
var fs = require('fs');

var options = {
	key:fs.readFileSync('./client.key'),
	cert:fs.readFileSync('./client.crt'),
	ca:[fs.readFileSync('./ca.crt')]
};

var stream = tls.connect(8000,options,function(){
	console.log('server connected',stream.authorized?'authorized':'unauthorized');
	process.stdin.pipe(stream);
});

stream.setEncoding('utf8');
stream.on('data',function(data){
	console.log(data);
});
stream.on('end',function(){
	// server.close();
});