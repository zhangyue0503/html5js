/*
 * Base Event Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
// private name
const evtname = Symbol('events');

// class definition
export class Event {
    /**
     * Event Constructor
     */
    constructor(options = {}) {
        this[evtname] = {};
        // auto add event for function config
        Object.keys(options).forEach((key) => {
            let it = options[key];
            if (typeof it === 'function'){
                this.on(key, it);
            }
        },this);
    }

    /**
     * add a listener with event type
     * @param {String}   type     - event type
     * @param {Function} listener - event listener
     */
    on(type, listener) {
        let list = this[evtname][type];
        if (!list){
            list = [];
            this[evtname][type] = list;
        }
        if (typeof listener === 'function'){
            list.push(listener);
        }
    }

    /**
     * remove a listener with event type
     * @param {String}   type     - event type
     * @param {Function} listener - event listener
     */
    off(type, listener) {
        let list = this[evtname][type];
        if (!list||!list.length){
            return;
        }
        let index = list.indexOf(listener);
        if (index>=0){
            list.splice(index, 1);
        }
    }

    /**
     * emit an event with type
     * @param {String}   type - event type
     * @param {Variable} args - parameters for event
     */
    emit(type, ...args) {
        let list = this[evtname][type];
        if (list&&list.length>0){
            list.forEach((it) => {
                it.apply(null, args);
            });
        }
    }
}