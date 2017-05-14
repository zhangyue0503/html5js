/**
 * Created by zhangyue on 2017/5/14.
 */

function fib(n){
	if(n<2){
		return 1;
	}else{
		return fib(n-2)+fib(n-1);
	}
};
var input = parseInt(process.argv[2],10);
process.send({result:fib(input)});


