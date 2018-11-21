/*
 * Base Module Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from '../disp/Event.js';
import { loadStyle } from "../umi/util/loader.js";

// private name
const parent = Symbol('parent');
const outlet = Symbol('outlet');
const template = Symbol('template');
const resource = Symbol('resource');

let fragment = document.createDocumentFragment();

// class definition
export class Module extends Event{
    /**
     * Module Constructor
     * @param  {Object}  options - module config object
     * @param  {Element} options.parent - module parent node
     * @param  {Array}   options.link - style link url list
     * @param  {Object}  options.template - module template list
     * @param  {String}  options.template.module-body - module body html template
     */
    constructor(options = {}) {
        super(options);
        this[parent] = options.parent;
        this[template] = options.template||{};
        // active module style
        if (options.link){
            let ret = [];
            options.link.forEach(function (it) {
                ret.push(it.src);
            });
            loadStyle(ret);
        }
    }

    /**
     * interpolate string template
     * @param   {String} name - template name
     * @param   {Object} params - template parameters
     * @returns {*}
     */
    interpolate (name, params={}) {
        let tpl = this[template][name];
        if (!tpl){
            return '';
        }
        tpl = tpl.text||'';
        let names = Object.keys(params);
        let vals = Object.values(params);
        return new Function(...names, `return \`${tpl}\`;`)(...vals);
    }

    /**
     * module build
     * @param options
     */
    build(options = {}) {
        // do somthing
        // sub class build this.body
        this.body = document.createElement('div');
        this.body.innerHTML = this.interpolate(
            'module-body', options
        );
    }

    /**
     * module show
     * @param {Object} params - request params
     * @param {Object} context - request context
     */
    show(params = {}, context = {}) {
        // do something
        if (this.body&&this[parent]){
            this[parent].appendChild(this.body);
        }
        this.refresh(params, context);
    }

    /**
     * module refresh
     * @param {Object} params - request params
     * @param {Object} context - request context
     */
    refresh(params = {}, context = {}) {
        // do something
    }

    /**
     * module hide
     */
    hide() {
        // do something
        if (this.body){
            fragment.appendChild(this.body);
        }
    }

    /**
     * get module outlet
     * @return Object
     */
    getOutlet() {
        if (!this[outlet]){
            let ret = {};
            let list = this.body.getElementsByClassName('j-outlet');
            for(let node of list){
                let name = node.name||'parent';
                ret[name] = node;
            }
            this[outlet] = ret;
        }
        return this[outlet];
    }
}