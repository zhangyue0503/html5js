/*
 * Not Found Module Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Module } from '../Module.js';

// class definition
export default class Group extends Module {
    /**
     * refresh group module
     * @param params
     * @param context
     */
    refresh(params, context) {
        super.refresh(params, context);
        this.body.innerHTML = this.interpolate(
            'module-content', params
        );
    }
}