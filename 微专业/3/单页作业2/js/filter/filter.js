//过滤器抽象
class Filter{
	constructor(context,next,chain){
		this._context = context;
		this._chain = chain;
		this._next = next;
	}

	chain(){
		if(this._chain){
			this._chain();
		}
	}

	next(){
		if(this._next){
			this._next();
		}
	}

	doFilter(){
		//Overwrite by subclasses

	}

}