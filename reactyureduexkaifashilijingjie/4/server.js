// import React from 'react';
// import {renderToString} from 'react-dom/server';
// import App from '../App';
//
// const appHTML = renderToString(<App />);
//
// console.log(appHTML);
//

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = new (require('express'))();
var express = require('express');
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler,{noInfo:true,publicPath:config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use('/static',express.static(__dirname + '/static'));

app.get("/",function(req,res){
	res.sendFile(__dirname+'/index.html');
});



app.listen(port,function(error){
	if(error){
		console.error(error);
	}else{
		console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.",port,port);
	}
});