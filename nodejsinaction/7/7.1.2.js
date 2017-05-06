/**
 * Created by zhangyue on 2017/5/4.
 */

//bodyParser、query
var connect = require('connect');
var bodyParser = require('body-parser');
var query = require('query-parser');

connect().use(query())
// .use(bodyParser())
.use(function(req,res){
	// console.log(req.body);
	// console.log(req.files);
	// res.end('Registered new user: '+req.body.username);
	res.end('thanks!');
}).listen(3000);

