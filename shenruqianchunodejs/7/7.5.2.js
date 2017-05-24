/**
 * Created by zhangyue on 2017/5/24.
 */

/*

 487  openssl genrsa -out server.key 1024
 488  openssl genrsa -out client.key 1024
 489  openssl rsa -in server.key -pubout -out server.pen
 490  openssl rsa -in server.key -pubout -out server.pem
 491  openssl rsa -in client.key -pubout -out client.pem
 492  openssl genrsa -out ca.key 1024
 493  openssl req -new -key ca.key -out ca.csr
 494  openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
 495  openssl req -new -key server.key -out server.csr
 496  openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
 498  openssl req -new -key client.key -out client.csr
 499  openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt


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