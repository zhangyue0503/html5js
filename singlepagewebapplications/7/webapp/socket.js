/**
 * Created by zhangyue on 2017/3/31.
 */

'use strict';
var
	setWatch,
	// countUp,
	http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	socketIo = require('socket.io'),
	fsHandle = require('fs'),

	io = socketIo.listen(server),
	watchMap = {};


setWatch = function(url_path,file_type){
	console.log('setWatch called on '+url_path);

	if(!watchMap[url_path]){
		console.log('setting watch on '+url_path);

		fsHandle.watchFile(
			url_path.slice(1),
			function(current,previous){
				console.log('file accessed');
				if(current.mtime !== previous.mtime){
					console.log('file changed');
					io.sockets.emit(file_type,url_path);
				}
			}
		);

		watchMap[url_path] = true;
	}
};

app.configure(function(){
	app.use(function(request,response,next){
		if(request.url.indexOf('/js/')>=0){
			setWatch(request.url,'script');
		}else if(request.url.indexOf('/css/')>=0){
			setWatch(request.url,'stylesheet');
		}
		next();
	});
	app.use(express.static(__dirname+'/'));
});

	// countIdx = 0;
// countUp = function(){
// 	countIdx++;
// 	console.log(countIdx);
// 	io.sockets.send(countIdx);
// };

// app.configure(function(){
// 	app.use(express.static(__dirname+'/'));
// });
app.get('/',function(request,response){
	response.redirect('/socket.html');
});

server.listen(3000);

console.log(
	'Express server listening on port %d in %s mode',
	server.address().port,app.settings.env
);

// setInterval(countUp,1000);