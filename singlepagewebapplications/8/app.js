/**
 * Created by zhangyue on 2017/3/29.
 */

//express4和3很多差别

'use strict'
var http = require('http'),
	express = require('express'),
	routes = require('./lib/routes.js'),
	app = express(),
	server = http.createServer(app);



app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	// app.use(express.basicAuth('user','spa'));
	app.use(express.static(__dirname+'/public'));
	app.use(app.router);
});

app.configure('development',function(){
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions:true,
		showStack:true
	}));
});

app.configure('production',function(){
	app.use(express.errorHandler());
});

routes.configRoutes(app,server);



server.listen(3000);

console.log(
	'Express server listening on port %d in %s mode',
	server.address().port,app.settings.env
);



// var connectHello,server,
// 	http = require('http'),
// 	connect = require('connect'),
// 	app = connect(),
// 	bodyText = 'Hello Connect'
// 	logger = require('morgan');
//
// connectHello = function(request,response,next){
// 	response.setHeader('content-length',bodyText.length);
// 	response.end(bodyText);
// };
//
// app.use(logger()).use(connectHello);
// server = http.createServer(app);
// server.listen(3000);
// console.log('Listening on port %d',server.address().port);



// var http,server;
//
// http = require('http');
// server = http.createServer(function(request,response){
// 	var responset_text = request.url === '/test'
// 		? 'you have hit the test page'
// 		: 'Hello World';
//
// 	response.writeHead(200, {'Content-Type':'text/plain'});
// 	response.end(responset_text);
// }).listen(3000);
//
// console.log('Listening on port %d',server.address().port);


