const express = require('express');
const static = require('express-static');
const fs = require('fs');

const server = express();
server.listen(2313);

server.use(['/a','/b'],function(req,res,next){
	fs.readFile('./index.html',function(err,data){
		if(err){
			res.send('404页面错误');
		}else{
			res.write(data);
			res.end();
		}
	});
});

server.use(static('./'));