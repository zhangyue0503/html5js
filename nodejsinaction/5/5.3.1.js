/**
 * Created by zhangyue on 2017/5/2.
 */

//redis
var redis  = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
client.on('error', function (err) {
	console.log('Error ' + err);
});

//键值对
client.set('color', 'red', redis.print);
client.get('color', function (err, value) {
	if (err) throw err;
	console.log('Got: ' + value);
});
//哈希表
client.hmset('camping', {
	'shelter' : '2-person tent',
	'cooking' : 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function (err, value) {
	if (err) throw err;
	console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', function (err, keys) {
	if (err) throw err;
	keys.forEach(function (key, i) {
		console.log('  ' + key);
	});
});
//链表
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, function (err, items) {
	if (err) throw err;
	items.forEach(function (item, i) {
		console.log('  ' + item);
	});
});
//集合
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', function (err, members) {
	if (err)throw err;
	console.log(members);
});

//信道传递数据
var net = require('net');

net.createServer(function (socket) {
	var subscriber,
		publisher;

	socket.on('connect',function(){
		subscriber = redis.createClient();
		subscriber.subscribe('main_chat_room');
		subscriber.on('message',function(channel,message){
			socket.write('Channel '+channel+': '+message);
		});
		publisher = redis.createClient();
	});

	socket.on('data',function(data){
		publisher.publish('main_chat_room',data);
	});

	socket.on('end',function(){
		subscriber.unsubscribe('main_chat_room');
		subscriber.end();
		publisher.end();
	});
}).listen(3000);
