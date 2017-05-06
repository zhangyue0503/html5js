/**
 * Created by zhangyue on 2017/5/6.
 */

//errorHandler
var connect = require('connect');
var errorHandler = require('errorhandler');
var logger = require('morgan');

connect()
	.use(logger('dev'))
	.use(function(req,res,next){setTimeout(function(){next(new Error('something broke!'));},500);})
	.use(errorHandler()).listen(3000);

