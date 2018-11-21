function rewrite(options){
	let rules = options.rules||[];
	rules.forEach(function(it){
		let target = it.target;
		if(typeof target !== 'function'){
			it.target = function(ctx){
				return target;
			}
		}

		let matcher = it.matcher;
		if(typeof matcher === 'function'){
			return;
		}
		if(typeof matcher === 'string'){
			it.matcher = function(ctx){
				return ctx.request.pathname === matcher;
			};
			return;
		}
		if(matcher instanceof RegExp){
			it.matcher = function(ctx){
				return matcher.test(ctx.request.pathname);
			};
			return;
		}

	});

	return function(context,next){
		let ret = rules.find(function(it){
			return it.matcher(context);
		});
		if(!!ret){
			let target = ret.target(context);
			context.request.pathname = target;
			if(!!context.hash){
				context.hash.pathname = target;
			}

		}

		next();
	};


}