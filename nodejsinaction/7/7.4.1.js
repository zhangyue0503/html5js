/**
 * Created by zhangyue on 2017/5/6.
 */

var connect = require('connect');
var static = require('serve-static');
var compress = require('compression');
var directory = require('serve-index');

//static
connect()
	// .use(static('public'))
	.use(directory('public'))
	.use(compress())
	.use('/app/files', static('public'))
	.listen(3000);

