/*
 * Tree Util API
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 */
import { Node } from './Node.js';

/**
 * build tree from path list
 *
 * @example
 *
 * ```javascript
 *      let root = build([
 *          '/a/b/',
 *          '/a/d/f/',
 *          '/b/c/d',
 *          '/b/c/f'
 *      ]);
 *      // output
 *      { root:Node, nmap:{umi:Node} }
 * ```
 *
 * @param  {Array} list - path list
 * @return {Object} tree root and path-node map
 */
export function build(list = []) {
    let map = {};
    let root = new Node('/');
    // /a/b/c/d/
    list.forEach(function (it) {
        let arr = it.split('/');
        // remove first "/"
        if (!arr[0]){
            arr.shift();
        }
        // build tree path
        let node = root;
        arr.forEach(function (name) {
            let child = node.getChildByName(name);
            if (!child){
                // create node if not exist
                child = new Node(name||'/', {
                    parent: node
                });
            }
            node = child;
        });
        map[it] = node;
    });
    return {
        root: root,
        nmap: map
    };
}

/**
 * get node by path from tree
 * @param   {Node} root - tree root
 * @param   {String} path - target path
 * @returns {Node} target node
 */
export function getNodeByPath(root, path) {
    let arr = path.split('/');
    // remove /
    if (!arr[0]){
        arr.shift();
    }
    // find path node
    let node = root;
    arr.find(function (it) {
        node = node.getChildByName(it||'/');
        return !node;
    });
    return node;
}

/**
 * get common path for source and target
 * @param   {String} source - source path
 * @param   {String} target - target path
 * @returns {String} common path for source and target, empty if not common
 */
export function getCommonPath(source, target) {
    if (!source||!target){
        return '';
    }
    // source to array
    let ret = [];
    let left = source.split('');
    // find common path
    left.find(function (it, index) {
        if (it!==target[index]){
            return true;
        }
        ret.push(it);
    });
    return ret.join('');
}

/**
 * get node with module register
 * @param   {Node} from - start node
 * @param   {Node} to - end node
 * @returns {Array} node list
 */
export function getModuleNode(from, to) {
    let ret = [];
    while(from){
        if (from.getModule()){
            ret.unshift(from);
        }
        if (from===to){
            break;
        }
        from = from.getParent();
    }
    return ret;
}
