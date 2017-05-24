/**
 * Created by zhangyue on 2017/5/24.
 */

var https = require('https');
var fs = require('fs');

var options = {
	hostname:'localhost',
	port:8000,
	path:'/',
	method:'GET',
	key:fs.readFileSync('./client.key'),
	cert:fs.readFileSync('./client.crt'),
	ca:[fs.readFileSync('./ca.crt')]
};

options.agent = new https.Agent(options);

var req = https.request(options,function(res){
	res.setEncoding('utf8');
	res.on('data',function(d){
		console.log(d);
	});
});
req.end();

req.on('error',function(e){
	console.log(e);
});
