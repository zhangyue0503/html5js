/*
 * Rewrite MiddleWare Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { MiddleWare } from "./MiddleWare.js";

/**
 * rewrite middle ware config function
 * @param  {Object} options - rest config
 * @return {MiddleWare}
 */
export function rewrite(options) {

    // format rules
    let rules = options.rules||[];
    rules.forEach(function (it) {
        // format target
        let target = it.target;
        if (typeof target !== 'function'){
            it.target = function (ctx) {
                return target;
            }
        }

        // format matcher
        let matcher = it.matcher;
        if (typeof matcher === 'function'){
            return;
        }
        if (typeof matcher === 'string'){
            it.matcher = function (ctx) {
                return ctx.request.pathname===matcher;
            };
            return;
        }
        if (matcher instanceof RegExp){
            it.matcher = function (ctx) {
                return matcher.test(ctx.request.pathname);
            };
            return;
        }
    });

    return class Rewrite extends MiddleWare {
        /**
         * REWRITE Constructor
         * @param args
         */
        constructor(next, options){
            super(next, options);
            this.name = 'REWRITE';
        }

        /**
         * exec rewrite middle ware
         * @param context
         */
        exec(context) {
            super.exec(context);

            let ret = rules.find(function (it) {
                return it.matcher(context);
            });

            if (!!ret){
                let target = ret.target(context);
                context.request.pathname = target;
                if (!!context.hash){
                    context.hash.pathname = target;
                }
            }

            this.next();
        }
    }
}

