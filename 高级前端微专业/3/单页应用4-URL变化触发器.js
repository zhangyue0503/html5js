function Monitor(opt){
	opt = opt||{};
	let last = null;
	let runUrlCheck = function(){
		let url = location.href;
		if(url!==last){
			let eveent = {
				oldValue:last,
				newValue:url
			};
			last = url;
			if(typeof opt.onchange === 'function'){
				opt.onchange(event);
			}
		}
	};

	//通用，不管是用hash还是改pathname，都可以侦测到变化
	window.setInterval(runUrlCheck,500);
}

let monitor = new Monitor({
	onchange:function(event){
		// TODO something
	}
});