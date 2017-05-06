/**
 * Created by zhangyue on 2017/5/4.
 */

//session
var connect = require('connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);

var hour = 3600000;
var sessionOpts = {
	key:'myapp_sid',
	store:new RedisStore({prefix:'sid'}),
	cookie:{
		maxAge:hour*24,
		httpOnly:false
	}
};

connect()
	.use(cookieParser('keyboard cat'))
	.use(session(sessionOpts))
	.use(function(req,res,next){
		var sess = req.session;
		if(sess.views){
			res.setHeader('Content-Type','text/html');
			res.write('<p>views: '+sess.views+'</p>');
			res.write('<p>expires in: '+(sess.cookie.maxAge/1000)+'</p>');
			res.write('<p>httpOnly: '+sess.cookie.httpOnly+'</p>');
			res.write('<p>path: '+sess.cookie.path+'</p>');
			res.write('<p>domain: '+sess.cookie.domain+'</p>');
			res.write('<p>secure: '+sess.cookie.domain+'</p>');
			sess.views++;
			res.end();
		}else{
			sess.views = 1;
			res.end('welcome to the session demo. refresh!');
		}
	}).listen(3000);
