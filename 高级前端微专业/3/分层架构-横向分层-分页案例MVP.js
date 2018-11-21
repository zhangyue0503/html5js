
class Presenter{
	
	constructor(total){
		this.index = 1;
		this.model = new Model(total);
		this.view = new View(this,this.model);
	}

	action(index){
		if(index === this.index){
			return;
		}

		//check out of index
		let FIRST = 1;
		let TOTAL = this.model.getTotal();
		if(index<FIRST||index>TOTAL){
			this.view.error('illegal page index');
			return;
		}


		//sync view
		this.view.unselect(this.index);
		this.view.select(index);
		this.view.disablePrev(index <= FIRST);
		this.view.disableNext(index >= TOTAL);
		this.index = index;
	}

}

class View{


	constructor(presenter,model){
		this.presenter = presenter;
	}

	select(index){ //选中按扭
		// ...
	}

	unselect(index){
		// ...
	}

	disablePrev(disabled){
		// ...
	}

	disableNext(disabled){
		// ...
	}

	onAction(event){
		let index = getIndex(event);
		this.presenter.action(index);
	}

	draw(index,total){
		//...
		this.body.addEventListener(
			'click',this.onAction.bind(this),false
		);
	}
}


// 不在持有视图状态
class Model {

	// 初始化数据结构
	constructor(total){
		this.total = total; //总页数
		this.inst = [];
	}

	getTotal(){
		return this.total;
	}

	setTotal(total){
		this.total = total;
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