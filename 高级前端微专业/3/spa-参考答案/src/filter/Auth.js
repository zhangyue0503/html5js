/*
 * User Auth Filter Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Filter } from './Filter.js';

// class definition
export class AuthFilter extends Filter{
    /**
     * exec filter action
     * @param {Object} context - filter context
     */
    doFilter(context){
        // not check auth for login module
        if (context.request.pathname==='/login'){
            this.chain();
            // this.next();
            return;
        }
        // TODO ajax request check login
        let session = context.session;
        if (!session||!session.user||!session.user.id){
            this.redirect('/login');
            return;
        }
        this.chain();
    }
}