function router(options){
	let routes = options.routes||{};
	let current = null;

	return function(context,next){
		let name = context.request.pathname;
		let module = routes[name];
		if(!module){
			redirect('/404');
			return;
		}

		//....
		if(!module instanceof Module){
			module = new module();
			routes[name] = module;
			module.build(context);
		}

		if(module === current){
			module.refresh(context);
		}else{
			if(current){
				current.hide();
			}
			current = module;
			current.show(context);
		}

		next();
	}

}