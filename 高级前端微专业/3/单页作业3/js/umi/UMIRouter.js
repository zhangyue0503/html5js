/*
 * UMI Router Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from '../disp/Event.js';
import { ensure } from "./util/loader.js";
import { build, getNodeByPath, getModuleNode, getCommonPath } from './util/tree.js';

// private name
const root = Symbol('root');
const divide = Symbol('divide');
const current = Symbol('current');

// class definition
export class UMIRouter extends Event{
    /**
     * Router Constructor
     *
     * @example
     *
     * ```
     *      routes: {
     *          '/a/b': 'module/a/b.html',
     *          '/a/b/d': {
     *              module: 'module/a/b/d.html',
     *              type: 1
     *          },
     *          '/d/e/f': FModule
     *          '/d/e/g': {
     *              module: GModule,
     *              outlet: 'g-module-parent'
     *          }
     *      }
     * ```
     *
     * @param  {Object} options - router config object
     * @param  {Object} options.routes - route rules config
     */
    constructor(options = {}) {
        super(options);
        // build umi tree
        let ret = build(
            Object.keys(options.routes)
        );
        // save root
        this[root] = ret.root;
        // save module and config
        Object.keys(ret.nmap).forEach(function (it) {
            let node = ret.nmap[it];
            let conf = options.routes[it];
            let type = typeof conf;
            if (type==='string'||
                type==='function'){
                node.setModule(conf);
            }else{
                node.setConfig(conf);
                node.setModule(conf.module);
            }
        });
    }

    /**
     * divide node list by target url
     * @param   {String} url - target url
     * @returns {Object} route result, split with action, show/refresh/hide
     */
    [divide](url) {
        let target = getNodeByPath(
            this[root], url
        );
        // check target exist
        if (!target){
            return null;
        }
        let ret = {};
        let source = this[current];
        // only show if not source
        // only refresh if source eql target
        if (!source||source===target){
            let name = 'show';
            if (source===target){
                name = 'refresh';
            }
            ret[name] = getModuleNode(target);
        }else{
            // find common node
            let path = getCommonPath(
                source.getPath(), url
            );
            let com = getNodeByPath(
                this[root], path
            );
            // dump module node exclude common node
            let dump = function(node){
                let list = getModuleNode(node, com);
                if (list[0]===com){
                    list.shift();
                }
                return list;
            };
            // dump hide/show/refresh node list
            ret.refresh = getModuleNode(com);
            ret.hide = dump(source);
            ret.show = dump(target);
        }
        // update source node
        this[current] = target;
        return ret;
    }

    /**
     * route to url
     * @param  {String} url - target url
     */
    route(url) {
        let ret = this[divide](url);
        if (!ret){
            return null;
        }
        // dump module list
        let mdl = [];
        let nds = [];
        ret.show.forEach(function (it) {
            let url = it.getModule();
            if (typeof url==='string'){
                mdl.push(url);
                nds.push(it);
            }
        });
        // load module
        return ensure(mdl).then(function (list) {
            nds.forEach(function (node, index) {
                node.setConfig(list[index]);
                node.setModule(list[index].module);
            });
            return ret;
        });
    }
}