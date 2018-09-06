function router(options) {
    let routes = options.router || {};
    let current = null;

    return function(context, next) {console.log(context);
        let name = context.request.pathname;
        let module = routes[name];
        if (!module) {
            // redirect('/404');
            // return;
            console.log('页面404');
            return;
        }
        if (!(module instanceof Module)) {
            module = new module(options);
            routes[name] = module;
            module.build(context);
        }

        if (module === current) {
            module.refresh(context);
        } else {
            if (current) {
                current.hide();
            }
            
            current = module;
            current.show(context);
        }

        next();
    }

}