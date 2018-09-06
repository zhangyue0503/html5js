let filters = [];

let filter = {
    add: function(ft) {
        if (ft instanceof Array) {
            ft.forEach(function(it) {
                filter.add(it);
            });
            return;
        }
        filter.push(filter);
    }
    mw: function(context, next) {
        let index = 0;
        let chain = function() {
            let Filter = filters[index++];
            if (Filter) {
                let ft = new Filter {
                    context,
                    next,
                    chain
                };
                ft.doFilter();
            }
        };
        chain();

    };

};