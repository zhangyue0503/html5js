/*
 * Router MiddleWare Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { MiddleWare } from "./MiddleWare.js";
import { Module } from '../module/module.js';
import { UMIRouter } from "../umi/UMIRouter.js";

// private name
const pathname = Symbol('pathname');

/**
 * Router middle ware config function
 * @param  {Object} options - rest config
 * @return {MiddleWare}
 */
export function router(options) {
    // format module root
    let parent = options.parent;
    let root = options.root||'';
    let routes = options.routes||{};
    Object.keys(routes).forEach(function (key) {
        routes[key] = root+routes[key];
    });
    // use umi router
    let ruter = new UMIRouter({
        routes: routes
    });

    return class Router extends MiddleWare {
        /**
         * Router Constructor
         * @param args
         */
        constructor(next, options){
            super(next, options);
            this.name = 'ROUTER';
        }

        /**
         * exec router middle ware
         * @param context
         */
        exec(context) {
            super.exec(context);

            let name = context.request.pathname;
            // route to module
            let ret = ruter.route(name);
            if (!ret){
                this.redirect('/404');
                return;
            }
            // action for module hide/show/refresh
            let fmap = {
                hide: function (module) {
                    if (module instanceof Module){
                        module.hide();
                    }
                    return module;
                },
                show: function (module, conf, params) {
                    if (module instanceof Module){
                        module.show(params, context);
                        return module;
                    }
                    // build module first
                    let m = new module(conf);
                    m.build(conf);
                    m.show(params, context);
                    return m;
                },
                refresh: function (module, conf, params) {
                    if (module instanceof Module){
                        module.refresh(params, context);
                        return module;
                    }
                    return fmap.show.apply(fmap, arguments);
                }
            };
            // get module parent
            let getParent = function(conf, outlet){
                return outlet[conf.outlet||'parent']||parent;
            };
            // load module async
            ret.then(function (res) {
                let params = context.request.restParams;
                // dispatch module action
                ['hide','refresh','show'].forEach(function (it) {
                    let list = res[it];
                    if (!list){
                        return;
                    }
                    list.forEach(function (node, index, list) {
                        // parse module parent
                        let parent = list[index-1];
                        let conf = node.getConfig();
                        let outs = {};
                        if (parent){
                            outs = parent.getModule().getOutlet();
                        }
                        conf.parent = getParent(
                            conf, outs
                        );
                        // update module instance
                        node.setModule(
                            fmap[it](
                                node.getModule(),
                                conf, params
                            )
                        );
                    });
                });

                this.next();
            }.bind(this));
        }
    }
}



// function router(options) {
//     let routes = options.router || {};
//     let current = null;

//     return function(context, next) {
//         console.log(context);
//         let name = context.request.pathname;


//         let routeName = name.replace(/\//g, '').toUpperCase();

//         loadJsCss(`/js/module/Module${routeName}.js`, () => {
//             let module = eval(`Module${routeName}`) || null;
//             if (!module) {
//                 redirect('/404');
//                 return;
//                 console.log('页面404');
//                 return;
//             }
//             if (!(module instanceof Module)) {
//                 module = new module(options);
//                 routes[name] = module;
//                 module.build(context);
//             }

//             if (module === current) {
//                 module.refresh(context);
//             } else {
//                 if (current) {
//                     current.hide();
//                 }

//                 current = module;
//                 current.show(context);
//             }
//             next();
//         });

//     }

// }