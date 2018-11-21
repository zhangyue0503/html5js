
class Controller{
	
	constructor(model,view){
		this.view = view;
		this.model = model;
		this.model.attach(this);
	}

	action(event){
		
		let index = getIndex(event);
		// check index
		this.model.updateIndex(index);
	}

}

class View{


	constructor(model){
		this.model = model;
		this.model.attach(this);//自己做为观察者
		this.constructor = new Controller(model,this);//实例化控制器
	}

	update(event){
		//更新页码
		this.updateIndex(
			event.last,
			event.index
		);
		//更新上一页下一页状态
		this.updateButState(
			event.index,
			this.model.getTotal()
		);
	}

	updateIndex(last,index){
		//...
	}

	updateButState(index,total){
		//...
	}


	draw(index,total){
		//...   绘制


		let handler = this.controller.action.bind(
			this.controller
		);
		this._body.addEventListener(
			'click',handler,false
		);
	}

}



class Model {

	// 初始化数据结构
	constructor(index,total){
		this.index = index; //当前页码
		this.total = total; //总页数
		this.inst = [];
	}

	// 更新页码
	updateIndex(index){
		let event = {
			index:index,
			last:this.index
		};
		this.index = index;
		this.notify(event);
	}

	getIndex(){
		return this.index;
	}

	getTotal(){
		return this.total;
	}

	// 外部添加观察者
	attach(inst){
		this.inst.push(inst);
	}

	// 触发更新
	notify(){
		this.inst.forEach(function(inst){
			inst.update();
		});
	}

}