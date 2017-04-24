/**
 * Created by zhangyue on 2017/4/24.
 */

//使用nimble实现串行化控制
var flow = require('nimble');
flow.series([
	function(callback){
		setTimeout(function(){
			console.log('I execute first.');
			callback();
		},1000);
	},
	function(callback){
		setTimeout(function(){
			console.log('I execute next.');
			callback();
		},500);
	},
	function(callback){
		setTimeout(function(){
			console.log('I execute last.');
			callback();
		},100);
	},
]);
