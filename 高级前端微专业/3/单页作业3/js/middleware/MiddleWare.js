/*
 * Base MiddleWare Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from '../disp/Event.js';
// private name
const nxt = Symbol('next');
const context = Symbol('context');

// class definition
export class MiddleWare extends Event {
    /**
     * MiddleWare Constructor
     * @param  {Function} next    - next middle ware action
     * @param  {Object}   options - middle ware config
     * @param  {Object}   options.context - middle ware context
     */
    constructor(next, options = {}) {
        super(options);

        this.name = 'MIDDLEWARE';
        this[nxt] = next;
        this[context] = options.context;
    }

    /**
     * get middle ware context
     * @returns {*}
     */
    getContext() {
        return this[context];
    }

    /**
     * run next middle ware
     */
    next() {
        if (this[nxt]){
            this[nxt]();
        }
    }

    /**
     * redirect to url
     * @param {Object} config - redirect config
     */
    redirect(config) {
        this.emit('redirect', config);
    }

    /**
     * execute middle ware
     * @param  {Object} context - middle ware context
     */
    exec(context) {
        console.log('exec middle ware '+this.name);
        // overwrite by sub class
        // call next middleware use this.next()
    }
}

