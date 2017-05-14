/**
 * Created by zhangyue on 2017/5/13.
 */

var net = require('net');
var host = process.argv[2];
var port = Number(process.argv[3]);
var socket = net.connect(port,host);

socket.on('connect',function(){
	process.stdin.pipe(socket);
	socket.pipe(process.stdout);
	process.stdin.resume();
});

socket.on('end',function(){
	process.stdin.pasuse();
});

//星球大战
//node 13.2.3.js towel.blinkenlights.nl 23

