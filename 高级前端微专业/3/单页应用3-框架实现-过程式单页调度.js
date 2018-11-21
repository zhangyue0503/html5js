

setInterval(function(){
	let last;
	let url = location.href;
	if(url!==last){
		last = url;
		History.update(url);

		let ret = Url.parse(url);

		// ....

		if(!Rewrite.check(ret)){
			Router.route(ret);
		}
	}
},500);