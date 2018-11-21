/*
 * Base Filter Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from '../disp/Event.js';

// private name
const context = Symbol('context');
const chan = Symbol('chain');
const nxt = Symbol('next');

// class definition
export class Filter extends Event {
    /**
     * Filter Constructor
     * @param  {Function} next    - exec next middle ware
     * @param  {Function} chain   - exec next filter
     * @param  {Function} options - filter config object
     */
    constructor(next, chain, options = {}){
        super(options);

        this[context] = options.context;
        this[chan] = chain;
        this[nxt] = next;
    }

    /**
     * get filter context
     * @returns {*}
     */
    getContext() {
        return this[context];
    }

    /**
     * redirect to url
     * @param {Object} config - redirect config
     */
    redirect(config) {
        this.emit('redirect', config);
    }

    /**
     * run next filter
     */
    chain() {
        if (this[chan]){
            this[chan]();
        }
    }

    /**
     * run next middleware
     */
    next() {
        if (this[nxt]){
            this[nxt]();
        }
    }

    /**
     * exec filter
     * @param {Object} context - filter context
     */
    doFilter(context) {
        // Overwrite by subclasses
        // go next middle ware use this.next()
        // go next filter use this.chain()
    }
}