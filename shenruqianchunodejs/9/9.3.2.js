/**
 * Created by zhangyue on 2017/5/26.
 */

process.on('message',function(m,server){
	if(m=='server'){
		server.on('connection',function(socket){
			socket.end('handled by child '+process.pid+'\n');
		});
	}
});
