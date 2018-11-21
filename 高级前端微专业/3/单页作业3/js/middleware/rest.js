function rest(options) {
    let matchers = options.matchers || [];
    //预先传入的配置参数
    matchers.forEach(function(it, index, list) {
        list[index] = str2matcher(it);
    });
    //预处理参数
    function str2matcher(url) {
        let ret = {
            url: url,
            keys: []
        };
        let reg = url.replace(/:(.+?)(?=\/|$)/g, function($1, $2) {
            ret.keys.push($2);
            return '([^/]+?)';
        });
        ret.matchers = new RegExp('^' + reg + '$', 'gi');
        return ret;
    }
    //获取参数
    function getParams(path) {
        let ret = {};
        matchers.find(function(it) {
            let res = it.matchers.exec(path);
            if (res) {
                it.keys.forEach(function(key, index) {
                    ret[key] = res[index + 1] || '';
                });
                return true;
            }
        });
        return ret;
    }
    //处理逻辑
    return function(context, next) {
        let req = context.request;
        req.restParams = getParams(req.pathname);
        if (!!req.hash) {
            let hash = new URL(
                req.hash.substr(1),
                req.origin
            );
            context.hash = hash;
            hash.restParams = getParams(hash.pathname);
        }
        next();
    }
}