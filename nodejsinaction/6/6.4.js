/**
 * Created by zhangyue on 2017/5/3.
 */

var connect = require('connect');
var app = connect();

app.use(setup(':method :url')).use(hello).listen(3000);


function setup(format){
	var regexp = /:(\w+)/g;

	return function logger(req,res,next){
		var str = format.replace(regexp,function(match,property){
			return req[property];
		});
		console.log(str);
		next();
	};
};






function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
};