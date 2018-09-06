class Module{
	constructor(config){
		this._parent = config.parent;
	}

	build(options){
		//do somthing
		//子类生成this._body
	}

	show(context){
		//do something
		if(this._body){
			this._parent.appendChild(this._body);
		}
	}

	refresh(){

	}

	hide(){
		//do something
		if(this._body){
			fragment.appendChild(this._body);
		}
	}

	destory(){

	}
}