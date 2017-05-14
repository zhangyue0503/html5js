/**
 * Created by zhangyue on 2017/5/13.
 */

//在文件改变时变化的socker.io服务器
var fs = require('fs'),
	url = require('url'),
	http = require('http'),
	path = require('path'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	root = __dirname;

app.use(function(req,res,next){
	req.on('static',function(){
		var file = url.parse(req.url).pathname;
		var mode = 'stylesheet';
		if(file[file.length-1]=='/'){
			file+='index2.html';
			mode = 'reload';
		}
		createWatcher(file,mode);
	});
	next();
});

app.use(express.static(root));

var watchers = {};

function createWatcher(file,event){

	var absolute = path.join(root,file);
	if(watchers[absolute]){
		return;
	}
	fs.watchFile(absolute,function(curr,prev){
		if(curr.mtime !== prev.mtime){
			io.sockets.emit(event,file);
		}
	});
	watchers[absolute] = true;
};

server.listen(8000);
