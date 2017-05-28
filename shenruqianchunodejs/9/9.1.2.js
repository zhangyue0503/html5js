/**
 * Created by zhangyue on 2017/5/26.
 */

var fork = require('child_process').fork;
var cpus = require('os').cpus();
for(var i=0;i<cpus.length;i++){
	fork('./9.1.2.js');
}
