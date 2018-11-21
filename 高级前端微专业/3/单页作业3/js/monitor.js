// 地址变化监控
function Monitor(opt){
	opt = opt||{};
	let last = null;
	let runUrlCheck = function(){
		let url = location.href;
		if(url!==last){
			let event = {
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