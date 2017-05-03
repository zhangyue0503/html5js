/**
 * Created by zhangyue on 2017/5/3.
 */

//中间件
var connect = require('connect');
var app     = connect();
app.use(logger).use('/admin',restrict).use('/admin',admin).use(hello).listen(3000)
//curl --user tobi:ferret http://localhost:3000/admin/users

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
};

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
};

function restrict(req,res,next){
	var authorization = req.headers.authorization;

	if(!authorization) return next(new Error('Unauthorized'));

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	authenticateWithDatabase(user,pass,function(err){
		if(err) return next(err);

		next();
	});
};

function admin(req,res,next){
	switch(req.url){
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(['tobi','loki','jane']));
			break;
	}
};

function authenticateWithDatabase(user,pass,callback){
	if(user == 'tobi' && pass == 'ferret'){
		callback();
	}else{
		callback('用户名密码错误');
	}
};