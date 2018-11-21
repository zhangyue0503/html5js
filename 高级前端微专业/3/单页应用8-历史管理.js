function hist(options) {

    //隐藏iframe产生历史记录
    var iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
    iframe.src = 'about:blank';

    window.history_locker = {};
    var lock_key = 'lock-' + (+newDate);

    function doPushHistory(hash) {
        if (!hash || history_locker[lock_key]) {
            history_locker[lock_key] = !1;
            return;
        }

        try {
            var doc = iframe.contentWindow.document;
            doc.write('<head><title>');
            doc.write(document.title);
            doc.write('</title>');
            doc.write(
                '<script>' +
                'parent.history_locker["' + lock_key + '"] = !0;' +
                'parent.location.hash=decodeURIComponent("' + encodeURIComponent(hash) + '");' +
                '</script>'
            );
            doc.wirte('</head><body></body>');
            doc.close();
            history_locker[lock_key] = !1;
        } catch (ex) {

        }

    }

    return function(context, next) {
        doPushHistory(
            context.request.hash
        );

        next();
    };

}