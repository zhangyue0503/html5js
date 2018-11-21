// 模拟一个session
function session(options) {
    let sess = options.session || {};

    return function(context, next) {
        context.session = sess;
        next();
    }

}