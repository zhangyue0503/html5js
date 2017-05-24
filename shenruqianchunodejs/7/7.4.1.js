/**
 * Created by zhangyue on 2017/5/24.
 */

var WebSocket = function(url){
	this.options = parse_url(url);
	this.connect();
};

WebSocket.prototype.onopen = function(){};

WebSocket.prototype.setSocket = function(socket){
	this.socket = socket;
};

WebSocket.prototype.connect = function(){
	var that = this;
	var key = new Buffer(this.options.protocolVersion+'-'+Date.now()).toString('base64');
	var shasum = crypto.createHash('sha1');
	var expected = shasum.update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');

	var options = {
		port:this.options.port,
		host:this.options.hostname,
		headers:{
			'Connection':'Upgrade',
			'Upgrade':'websocket',
			'Sec-WebSocket-Version':this.options.protocolVersion,
			'sec-WebSocket-Key':key
		}
	};

	var req = http.request(options);
	req.end();

	req.on('upgrade',function(res,socket,upgradeHead){
		that.setSocket(socket);
		that.onopen();
	});
};

WebSocket('http://localhost:3000');
