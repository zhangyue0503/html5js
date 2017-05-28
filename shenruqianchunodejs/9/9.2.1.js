/**
 * Created by zhangyue on 2017/5/26.
 */

var cp = require('child_process');
var n = cp.fork(__dirname+'/9.2.2.js');
n.on('message',function(m){
	console.log('PARENT got message:',m);
});

n.send({hello:'world'});
