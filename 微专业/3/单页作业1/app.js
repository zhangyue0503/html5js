// 整合spa和monitor
let monitor = new Monitor({
	onchange:function(event){
		spa.dispatch({
			request:new URL(event.newValue)
		});
	}
});