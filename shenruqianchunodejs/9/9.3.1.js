/**
 * Created by zhangyue on 2017/5/26.
 */

var child = require('child_process').fork('9.3.2.js');

var server = require('net').createServer();

server.on('connection',function(socket){
	socket.end('handled by parent\n');
});
server.listen(1337,function(){
	child.send('server',server);
});


