let app = {
    start: function(options) {
        spa.add(session(options));
        spa.add(rest(options));
        spa.add(hist());
        spa.add(rewrite(options));
        filter.add(AuthFilter);
        spa.add(filter.mw);
        spa.add(router(options));


        let monitor = new Monitor({
            onchange: function(event) {
                let context = {
                    request: new URL(event.newValue)
                };
                spa.dispatch(context);
            }
        });

    }
};

app.start({
    matchers: [
        '/user/:id',
        '/group/:gid/user/:uid'
    ],
    rules: [{
            matcher: /\/group\/[\d]+\/user\/[\d+]\/?/i,
            target: '/group/'
        },
        {
            matcher: /\/user\/[\d+]\/?/i,
            target: '/user/'
        }
    ],
    router: {
        '/user/': User,
        '/group/': Group
    },
    parent: document.body,
    session: {
        user: {
            id: 1
        }
    }
});