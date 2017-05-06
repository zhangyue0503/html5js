/**
 * Created by zhangyue on 2017/5/6.
 */

//basicAuth
//curl http://localhost:3000/ --user tobi:ferret -i
var connect = require('connect');
var basicAuth = require('basic-auth-connect');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

connect()
	.use(basicAuth('tobi', 'ferret'))
	.use(bodyParser())
	.use(cookieParser('secret'))
	.use(session())
	.use(csrf())
	.use(function(req,res){
		res.end("I'm a secret\n");
	}).listen(3000);


