/**
 * Created by zhangyue on 2017/5/4.
 */

//methodOverride
var connect = require('connect');
var methodOverride = require('method-override');
var logger = require('morgan');
var bodyParser = require('body-parser');

function edit(req,res,next){
	if('GET'!=req.method) return next();
	res.setHeader('Content-Type','text/html');
	res.write('<form method="post">');
	res.write('<input type="hidden" name="_method" value="put" /> ');
	res.write('<input type="text" name="user[name]" value="Tobi"/>');
	res.write('<input type="submit" value="Update"/>');
	res.write('</form>');
	res.end();
};

function update(req,res,next){
	console.log(req.method);
	if('PUT'!=req.method) return next();
	res.end('Updated name to '+req.body.user.name);
};

connect()
	.use(logger('dev'))
	.use(bodyParser())
	.use(methodOverride('_method'))//?_method=PUT
	.use(edit)
	.use(update)
	.listen(3000);
