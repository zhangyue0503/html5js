/**
 * Created by zhangyue on 2017/5/24.
 */

var tls = require('tls');
var fs = require('fs');

var options = {
	key:fs.readFileSync('./server.key'),
	cert:fs.readFileSync('./server.crt'),
	requestCert:true,
	ca:[fs.readFileSync('./ca.crt')]
};

var server = tls.createServer(options,function(stream){
	console.log('server connected',stream.authorized?'authorized':'unauthorized');
	stream.write('welcome!\n');
	stream.setEncoding('utf8');
	stream.pipe(stream);
});

server.listen(8000,function(){
	console.log('server bound');
});