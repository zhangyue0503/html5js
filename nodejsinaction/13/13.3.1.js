/**
 * Created by zhangyue on 2017/5/14.
 */

//根据环境变量DEBUG定义debug函数
//DEBUG=1 node 13.3.1.js
var debug;
if(process.env.DEBUG){
	debug = function(data){
		console.log(data);
	};
}else{
	debug = function(){};
}

debug('this is a debug call');
console.log('Hello world!');
debug('this another debug call');

process.on('exit',function(code){
	console.log('Exiting...');
});
process.on('uncaughtException',function(err){
	console.error('got uncaught exception:',err.message);
	process.exit(1);
});

throw new Error('an uncaught exception');



