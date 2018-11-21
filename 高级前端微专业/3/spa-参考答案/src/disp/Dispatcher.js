/*
 * Dispatcher Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Event } from './Event.js';

// private name
const middleware = Symbol('middleware');

// class definition
export class Dispatcher extends Event {
    /**
     * Dispatcher Constructor
     * @param options
     */
    constructor(options) {
        super(options);

        this[middleware] = [];
    }

    /**
     * add one or more middle ware
     * @param  {MiddleWare} MiddleWare - MiddleWare Constructor
     */
    add() {
        this[middleware].push.apply(
            this[middleware], arguments
        );
    }

    /**
     * redirect to url
     * @param url
     */
    redirect(url) {
        this.emit('redirect', { url: url });
    }

    /**
     * dispatch middle ware
     * @param {Object} context - exec context
     */
    dispatch(context) {
        let index = 0;
        let list = this[middleware];

        let next = () => {
            let MiddleWare = list[index++];
            if (MiddleWare){
                let mw = new MiddleWare(next, {
                    context: context,
                    redirect: this.redirect.bind(this)
                });
                return mw.exec(context);
            }
        };

        return next();
    }
}




