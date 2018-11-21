/*
 * Filter MiddleWare Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { MiddleWare } from "./MiddleWare.js";

let filters = [];

/**
 * add filter
 * @param {Filter} ft
 */
export function add(ft) {
    filters.push.apply(filters, arguments);
}

// class definition
export class Filter extends MiddleWare {
    /**
     * Filter Constructor
     * @param args
     */
    constructor(next, options){
        super(next, options);
        this.name = 'FILTER';
    }

    /**
     * run filter middleware
     * @param context
     */
    exec(context) {
        super.exec(context);
        // do next middle ware if no filter
        if (!filters.length){
            this.next(context);
            return;
        }

        // run filter chain
        let index = 0;
        let chain = () => {
            let Ft = filters[index++];
            if (Ft){
                let chai = chain;
                let next = this.next.bind(this,context);
                // next for last filter chain
                if (!filters[index]){
                    chai = next;
                }
                let ft = new Ft(next, chai, context);
                ft.on('redirect',this.redirect.bind(this));
                ft.doFilter(context);
            }
        };
        chain();
    }
}
