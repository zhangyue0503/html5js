/*
 * App Wrapper
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import {Monitor} from "./disp/Monitor.js";
import { Dispatcher } from './disp/Dispatcher.js';
import { rest } from './middleware/RESTParser.js';
import { rewrite } from "./middleware/Rewrite.js";
import { add, Filter } from "./middleware/Filter.js";
import { AuthFilter } from "./filter/Auth.js";
import { router } from './middleware/Router.js';

// init dispatcher instance
let dsp = new Dispatcher({
    redirect: function(event){
        location.hash = event.url;
    }
});

// start spa dispatcher
export function start(options) {
    // init middle ware chain
    dsp.add(rest(options));
    dsp.add(rewrite(options));
    dsp.add(Filter);
    // add(AuthFilter);
    dsp.add(router(options));

    // start monitor
    let monitor = new Monitor({
        key: 'href',
        source: location,
        change: function(event){
            dsp.dispatch({
                request: new URL(
                    event.newValue
                )
            });
        }
    });
    monitor.start();
}
