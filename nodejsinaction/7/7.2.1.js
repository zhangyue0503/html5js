/**
 * Created by zhangyue on 2017/5/4.
 */

//logger(替换成morgen)、favicon
var connect = require('connect');
var logger = require('morgan');
var favicon = require('serve-favicon');


connect()
	.use(favicon(__dirname+'/public/favicon.ico'))
	.use(logger('dev'))
	.use(function(req,res){
		res.end('Say Hello!\n');
	})
	.listen('3000');
