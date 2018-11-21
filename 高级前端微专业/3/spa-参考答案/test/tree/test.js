import { build, getNodeByPath, getCommonPath, getModuleNode } from '../../src/umi/util/tree.js';

let except = chai.expect;

describe('tree', function () {

    describe('.build', function () {
        it('should be ok to build empty', function () {
            let root = build().root;
            except(root.getChildren().length).to.be.equal(0);
        });

        it('should be ok to build tree without / leaf', function () {
            let root = build(['/a/b']).root;
            let child = root.getChildByName('a');
            except(child.getChildByName('b')).not.equal(null);
        });

        it('should be ok to build tree with / leaf', function () {
            let xmap = build(['/a/b/']);
            let child = xmap.root
                .getChildByName('a')
                .getChildByName('b');
            except(child.getChildByName('/')).not.equal(null);
        });
    });

    describe('.getNodeByPath', function () {
        let root = build(['/a/b/c','/a/d/e/','/f/g/h/i']).root;

        it('should be ok to get undefined if node not exist', function () {
            except(getNodeByPath(root, '/x/y')).to.be.equal(undefined);
        });

        it('should be ok to get leaf node', function () {
            except(getNodeByPath(root, '/a/b/c')).not.equal(null);
        });

        it('should be ok to get not leaf node', function () {
            except(getNodeByPath(root, '/a/d')).not.equal(null);
        });
    });

    describe('.getCommonPath', function () {
        it('should be ok to get common path without one input', function () {
            except(getCommonPath('/a/b')).to.be.equal('');
        });

        it('should be ok to get common path without common', function () {
            except(getCommonPath('/a/b', '/x/y')).to.be.equal('/');
        });

        it('should be ok to get with common path and without /', function () {
            except(getCommonPath('/a/b', '/a/b/c')).to.be.equal('/a/b');
        });

        it('should be ok to get with common path and with /', function () {
            except(getCommonPath('/a/', '/a/d')).to.be.equal('/a/');
        });
    });

    describe('.getModuleNode', function () {
        let root = build(['/a/b/c','/a/d/e/','/f/g/h/i']).root;
        getNodeByPath(root, '/a/d').setModule('/a/d.html');
        getNodeByPath(root, '/a').setModule('/a.html');
        it('should be ok to get module node without module config', function () {
            let from = getNodeByPath(root, '/f/g');
            except(getModuleNode(from, root).length).to.be.equal(0);
        });

        it('should be ok to get module node with module config', function () {
            let from = getNodeByPath(root, '/a/d');
            except(getModuleNode(from, root).length).to.be.equal(2);
        });

        it('should be ok to get module node with the same node', function () {
            let from = getNodeByPath(root, '/a/d');
            except(getModuleNode(from, from).length).to.be.equal(1);
        });

        it('should be ok to get module node with from/to module', function () {
            let from = getNodeByPath(root, '/a/d/e');
            let to = getNodeByPath(root, '/a');
            except(getModuleNode(from, to).length).to.be.equal(2);
        });

        it('should be ok to get module node without target', function () {
            let from = getNodeByPath(root, '/a/d/e');
            except(getModuleNode(from).length).to.be.equal(2);
        });
    });

});
