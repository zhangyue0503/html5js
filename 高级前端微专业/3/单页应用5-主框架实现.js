let mws = [];

let spa = {
	//添加中间件
	add:function(mw){
		if(typeof mw === 'function'){
			mws.push(mw);
		}
	},
	//中间件调度函数
	dispatch:function(context){
		let index = 0;
		let next = function(){
			let mw = mws[index];
			index++;
			if(mw){
				return mw(context,next);
			}
		};
		next();
	}
};