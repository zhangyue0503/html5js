/*
 * Resource Loader Util API
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
// load state cache
// { url:{status,result,promise} }
const cache = {};

// load status enum
const STATUS = Object.freeze({
    FAILED: Symbol('FAILED'),
    LOADING: Symbol('LOADING'),
    SUCCESS: Symbol('SUCCESS')
});

/**
 * load resource with url
 * @param   {String} url - resource url
 * @param   {Function} loading - load resource action
 * @returns {Promise} Loader Promise Instance
 */
function load(url, loading) {
    let res = cache[url]||{};
    if (res.status===STATUS.LOADING||
        res.status===STATUS.SUCCESS){
        // check resource loading or loaded
        return res.promise;
    }else{
        // load resource
        res.status  = STATUS.LOADING;
        res.promise = loading(url);
        cache[url] = res;
    }
    return res.promise;
}

// dump info for style/script/template
let fmap = {
    'link': function (node) {
        return {
            src: node.href
        };
    },
    'script': function (node) {
        return {
            src: node.src,
            text: node.textContent
        };
    },
    'template': function (node) {
        return {
            id: node.id,
            text: node.innerHTML
        }
    }
};

/**
 * parse module html
 * @param  {String} html - module html code
 * @param  {Object} module result
 */
function parse(html) {
    let ret = {
        link: [],
        script: [],
        template: {}
    };
    // dump style/script/template list
    let doc = new DOMParser().parseFromString(
        html, 'text/html'
    );
    ['link','script','template'].forEach(function (tag) {
        let list = doc.getElementsByTagName(tag);
        for(let it of list){
            let res = fmap[tag](it);
            if (tag==='template'){
                ret[tag][res.id] = res;
            }else{
                ret[tag].push(res);
            }
        }
    });
    // return module resource
    return ret;
}

/**
 * load module script
 * @param  {String} url - module script url
 */
function loadModuleScript(url) {
    return new Promise(function (resolve) {
        let script = document.createElement('script');
        let key = Symbol.for(url);
        window[key] = function (Module) {
            resolve(Module);
            document.head.removeChild(script);
            delete window[key];
        };
        // active script
        document.head.appendChild(script);
        script.type = 'module';
        script.textContent = `
            import Module from '${url}';
            window[Symbol.for('${Symbol.keyFor(key)}')](Module);
        `;
    });
}

/**
 * load module with url
 * @param   {String} url - resource url
 * @returns {Promise} Loader Promise Instance
 */
function loadModule(url) {
    let process = function (html, done) {
        let state = cache[url];
        if (state.status===STATUS.LOADING){
            // parse html
            let ret = parse(
                '<base href="'+url+'">'+html
            );
            state.result = ret;
            let src = ret.script[0].src;
            loadModuleScript(src).then(function (Module) {
                state.status = STATUS.SUCCESS;
                ret.module = Module;
                done(ret);
            });
        }else{
            done(state.result);
        }
    };
    // load module
    return load(url, function (url) {
        return new Promise(function (resolve) {
            fetch(url)
                .then(function (res) {
                    return res.text();
                })
                .then(function (html) {
                    process(html, resolve);
                });
        });
    });
}

/**
 * load style list
 * @param  {Array} list - style url list
 */
export function loadStyle(list) {
    let ret = [];
    list.forEach(function (it) {
        ret.push(load(it, function () {
            return new Promise(function (resolve) {
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                document.head.appendChild(link);
                link.href = it;
                resolve();
            });
        }))
    });
    Promise.all(ret);
}

/**
 * ensure resource list load
 * @param  {Array} list - resource url list
 */
export function ensure(list) {
    let ret = [];
    list.forEach(function (it) {
        ret.push(loadModule(it));
    });
    return Promise.all(ret).then(function () {
        let res = [];
        list.forEach(function (it) {
            res.push(cache[it].result)
        });
        return res;
    });
}


