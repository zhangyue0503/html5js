/**
 * Created by zhangyue on 2017/4/23.
 */

var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,client){
	var welcome = "Welcome!\nGuests online: "+this.listeners('broadcast').length;
	client.write(welcome+"\n");
	this.clients[id] = client;
	this.subscriptions = function(senderId,message){
		if(id!=senderId){
			this.clients[id].write(message);
		}
	};
	this.on('broadcast',this.subscriptions);
});

channel.on('leave',function(id){
	channel.removeEventListener('broadcast',this.subscriptions);
	channel.emit('broadcast',id,id+" has left the chat.\n");
});

channel.on('shutdown',function(){
	channel.emit('broadcast','',"Chat has shut down.\n");
	channel.removeAllListeners('broadcast');
});

channel.setMaxListeners(50);//设置监听器数量

var server = net.createServer(function(client){
	var id = client.remoteAddress+':'+client.remotePort;
	channel.emit('join',id,client);
	client.on('data',function(data){
		data = data.toString();
		if(data=="shutdown\r\n"){
			channel.emit('shutdown');
		}
		channel.emit('broadcast',id,data);
	});

	client.on('close',function(){
		channel.emit('leave',id);
	});
	// socket.once('data',function(data){
	// 	socket.write(data);
	// });
	// socket.on('data',function(data){
	// 	socket.write(data);
	// });
}).listen(8888);








