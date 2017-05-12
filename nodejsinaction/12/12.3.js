/**
 * Created by zhangyue on 2017/5/13.
 */

//集群api
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var workers = {};
var requests = 0;

if(cluster.isMaster){
	for(var i=0;i<numCPUs;i++){
		workers[i] = cluster.fork();

		(function(i){
			workers[i].on('message',function(message){
				if(message.cmd = 'incrementRequestTotal'){
					requests++;
					for(var j=0;j<numCPUs;j++){
						workers[j].send({
							cmd:'updateOfRequestTotal',
							requests:requests
						});
					}
				}
			});
		})(i);
	}
}else{
	process.on('message',function(message){
		if(message.cmd == 'updateOfRequestTotal'){
			requests = message.requests;
		}
	});
	http.Server(function(req,res){
		res.writeHead(200);
		res.end('Worker in process '+process.pid+' says cluster has responded to '+requests+' requests.');
		process.send({cmd:'incrementRequestTotal'});
	}).listen(8000);
}
