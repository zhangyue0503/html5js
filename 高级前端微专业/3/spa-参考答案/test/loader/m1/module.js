/*
 * Not Found Module Class
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */

// class definition
export default class NotFound{
    /**
     * build user module
     * @param options
     */
    build(options) {
        this.body = document.createElement('div');
        this.body.innerHTML = '<p>模块找不到！！</p>';
    }
}