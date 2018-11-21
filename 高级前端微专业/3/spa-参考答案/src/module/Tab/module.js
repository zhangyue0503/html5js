/*
 * Not Found Module Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Module } from '../Module.js';

// private name
const tabitem = Symbol('tabitem');

// class definition
export default class Group extends Module {
    /**
     * module build
     * @param options
     */
    build(options) {
        super.build(options);
        this[tabitem] = this.body.getElementsByClassName('j-item');
    }

    /**
     * refresh tab module
     * @param params
     * @param context
     */
    refresh(params, context) {
        super.refresh(params, context);
        let umi = context.request.pathname;
        for(let it of this[tabitem]){
            if (umi===it.dataset.umi){
                it.classList.add('j-selected');
            }else{
                it.classList.remove('j-selected');
            }
        }
    }
}