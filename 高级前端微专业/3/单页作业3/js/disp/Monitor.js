/*
 * Monitor Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from './Event.js';

// private name
const key = Symbol('key');
const last = Symbol('last');
const check = Symbol('check');
const timer = Symbol('timer');
const source = Symbol('source');
const interval = Symbol('interval');

// class definition
export class Monitor extends Event{
    /**
     * Monitor Constructor
     * @param {Object} options - Monitor config object
     * @param {Number} options.interval - check interval
     * @param {Object} options.source   - watch object
     * @param {Object} options.key      - watch key
     */
    constructor(options = {}) {
        super(options);

        this[last];
        this[key] = options.key;
        this[source] = options.source||{};
        this[interval] = options.interval||100;
    }

    /**
     * check prop changes
     */
    [check]() {
        let event = {
            oldValue: this[last],
            newValue: this[source][this[key]]
        };
        if (event.oldValue!==event.newValue){
            this[last] = event.newValue;
            this.emit('change', event);
        }
    }

    /**
     * start monitor
     */
    start() {
        if (!this[timer]){
            this[timer] = setInterval(
                this[check].bind(this),
                this[interval]
            );
            this[check]();
        }
    }

    /**
     * stop monitor
     */
    stop() {
        if (this[timer]){
            this[timer] = clearInterval(
                this[timer]
            );
        }
    }
}




