/**
 * Created by zhangyue on 2017/5/26.
 */


process.on('message',function(m){
	console.log('CHILD got message',m);
});

process.send({foo:'bar'});
