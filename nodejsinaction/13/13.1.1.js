/**
 * Created by zhangyue on 2017/5/13.
 */

//用自己的时间更新客户端的Socket.IO服务器
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index1.html', 'utf8');

function handler(req,res){
	res.setHeader('Content-Type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html,'utf8'));
	res.end(html);
};

function tick(){
	var now = new Date().toUTCString();
	io.sockets.send(now);
};

setInterval(tick,1000);

app.listen(8000);


