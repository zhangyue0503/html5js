/**
 * Created by zhangyue on 2017/5/22.
 */

var net = require('net');

var client = net.connect({port:8124},function(){
	console.log('client connected');
	client.write('world!\r\n');
});

client.on('data',function(data){
	console.log(data.toString());
	client.end();
});

client.on('end',function(){
	console.log('client disconnected');
});


