/**
 * Created by zhangyue on 2017/4/28.
 */
//提供静态文件服务
var http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req,res){
	var url = parse(req.url);
	var path = join(root,url.pathname);

	fs.stat(path,function(err,stat){
		if(err){
			if('ENOENT' == err.code){
				res.statusCode = 404;
				res.end('Not Found');
			}else{
				res.statusCode = 500;
				res.end('Internal ServerError');
			}
		}else{
			res.setHeader('Content-Length',stat.size);
			var stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error',function(err){
				res.statusCode = 500;
				res.end('Internal Server Error');
			});
		}
	});




	// stream.pipe(res);
	//
	// stream.on('error',function(err){
	// 	res.statusCode = 500;
	// 	res.end('Internal Server Error');
	// });

	// req.pipe(fs.createWriteStream('./req-body.txt'));

	// stream.on('data',function(chunk){
	// 	res.write(chunk);
	// });
	// stream.on('end',function(){
	// 	res.end();
	// });



}).listen(3000);