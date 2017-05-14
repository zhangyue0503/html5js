/**
 * Created by zhangyue on 2017/5/13.
 */

var b = new Buffer("121234869");
console.log(b.length);
console.log(b);

b = new Buffer(4);
b.writeInt32LE(121234869,0);
console.log(b.length);
console.log(b);

var net = require('net');
// net.createServer(function(socket){
// 	socket.write('Hello World!\r\n');
// 	socket.end();
// }).listen(1337);
//
// console.log('listening on port 1337');


var socket = net.connect({host:process.argv[2],port:22});
socket.setEncoding('utf8');
socket.once('data',function(chunk){
	console.log('SSH server version: %j',chunk.trim());
	socket.end();
});


