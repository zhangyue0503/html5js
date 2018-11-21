/*
 * REST Parser MiddleWare Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { MiddleWare } from "./MiddleWare.js";

/**
 * rest
 * @param  {Object} options - rest config
 * @param  {Array}  options.matchers - rest matcher list
 * @return {MiddleWare}
 */
export function rest(options) {

    let matchers = options.matchers||[];
    matchers.forEach((it, index, list) => {
        list[index] = str2matcher(it);
    });

    // format matcher
    function str2matcher(url) {
        let ret = {
            url: url,
            keys: []
        };
        let reg = url.replace(/:(.+?)(?=\/|$)/g,function ($1, $2) {
            ret.keys.push($2);
            return '([^/]+?)';
        });
        // $
        ret.matcher = new RegExp('^'+reg+'(?=/|$)','gi');
        return ret;
    }

    // get rest parameters
    function getParams(path) {
        let ret = {};
        matchers.find(function (it) {
            it.matcher.lastIndex = -1;
            let res = it.matcher.exec(path);
            if (res){
                it.keys.forEach(function (key, index) {
                    ret[key] = res[index+1]||'';
                });
                return true;
            }
        });
        return ret;
    }

    return class RESTParser extends MiddleWare {
        /**
         * REST Parser Constructor
         * @param args
         */
        constructor(next, options){
            super(next, options);
            this.name = 'REST_PARSER';
        }

        /**
         * execute rest parser middle ware
         * @param context
         */
        exec(context) {
            super.exec(context);

            // overwrite request by hash
            let req = context.request;
            let hash = new URL(
                req.hash.substr(1),
                req.origin
            );
            context.request = hash;
            hash.restParams = getParams(
                hash.pathname
            );

            this.next();
        }
    }
}

