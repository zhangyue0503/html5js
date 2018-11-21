/*
 * Tree Node Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from '../../disp/Event.js';
// private name
const id = Symbol('id');
const config = Symbol('config');
const module = Symbol('module');
const parent = Symbol('parent');
const children = Symbol('children');

// class definition
export class Node extends Event{
    /**
     * Node Constructor
     *
     * ```
     *      Node
     *       |- id          - node id
     *       |- module      - module bind for node
     *       |- config      - module config
     *       |- parent      - node parent
     *       |- children    - child node list
     * ```
     *
     * @param  {String} name - node name
     * @param  {Object} options - node config
     * @param  {Node}   options.parent - parent node
     * @param  {Object} options.config - module config object
     * @param  {String|Module} options.module - module url or Module constructor
     */
    constructor(name, options = {}) {
        super(options);

        this[children] = [];
        this[id] = name||'auto';

        this.setConfig(options.config||{});
        this.setModule(options.module);
        this.appendTo(options.parent);
    }

    /**
     * get node name
     * @returns {String} node name
     */
    getName() {
        return this[id];
    }

    /**
     * get parent Node
     * @returns {Node} parent node
     */
    getParent() {
        return this[parent];
    }

    /**
     * get module
     * @returns {String|Module} module url or class
     */
    getModule() {
        return this[module];
    }

    /**
     * set module url or class
     * @param {String|Module} m - module url or class
     */
    setModule(m) {
        this[module] = m;
    }

    /**
     * get module config
     * @returns {Object} module config
     */
    getConfig() {
        return this[config];
    }

    /**
     * set module config
     * @param {Object} conf - module config
     */
    setConfig(conf) {
        this[config] = Object.assign(
            this[config]||{}, conf
        );
    }

    /**
     * append to parent
     * @param {Node} node - parent node
     */
    appendTo(node) {
        this[parent] = node;
        if (node instanceof Node){
            node.addChild(this);
        }
    }

    /**
     * add child node
     * @param  {Node} node - child node
     */
    addChild(node) {
        if (node instanceof Node){
            this.getChildren().push(node);
        }
    }

    /**
     * get child node list
     * @returns {Array} child node list
     */
    getChildren() {
        return this[children];
    }

    /**
     * get child node by name
     * @param   {String} name - node name
     * @returns {Node} child node
     */
    getChildByName(name) {
        let list = this.getChildren();
        return list.find(function (it) {
            if (name===it.getName()){
                return true;
            }
        });
    }

    /**
     * get node path
     * @returns {String} node path
     */
    getPath() {
        let ret = [];
        let parent = this.getParent();
        if (parent){
            let path = parent.getPath();
            ret.push(path);
            // check last "/" char for path
            if (path[path.length-1]!=='/'){
                ret.push('/');
            }
        }
        let id = this.getName();
        // check last / char
        if (id!==ret[ret.length-1]){
            ret.push(id);
        }
        return ret.join('');
    }
}

