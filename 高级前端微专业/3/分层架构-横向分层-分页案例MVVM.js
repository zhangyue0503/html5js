
class ViewModel{
	
	constructor(total){
		this.model = new Model(total);
		//view state 抽象数据模型
		this.data = {
			list:[],
			disPrev:'',
			disNext:''
		};
		this.refreshViewState(this.index);
	}

	// 
	refreshViewState(index){
		let FIRST = 1;
		let TOTAL = this.model.getTotal();
		let list = this.getPages(index,TOTAL);
		//对数据模型的操作
		list.forEach(function(it,index){
			this.data.list[index] = {
				text:it,
				class:'pg'+(it===index?' selected':'')
			}
		},this);
		this.data.disPrev = index<=FIRST?'disabled':'';
		this.data.disNext = index>=TOTAL?'disabled':'';
	}

	go(index){
		this.refreshViewState(index);
	}

}

//视图层
<div class="m-pager">
	<span class="prev {{disPrev}}" on-click={this.prev()}>&nbsp;</span>
	{#list list as it}
	<span class="{{it.class}}}}" on-click={this.go(it_index)}>{{it.text}}</span>
	{/#list}
	<span class="prev {{disNext}}" on-click={this.next()}>&nbsp;</span>
</div>


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