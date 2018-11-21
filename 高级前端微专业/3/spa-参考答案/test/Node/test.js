import { Node } from '../../src/umi/util/Node.js';

let except = chai.expect;

describe('Node', function () {

    describe('#getPath', function () {
        it('should be ok to get root path', function () {
            let root = new Node('/');
            except(root.getPath()).to.be.equal('/');
        });

        it('should be ok to get tree path', function () {
            let root = new Node('/');
            let node = new Node('a', {
                parent: root
            });
            let leaf = new Node('b', {
                parent: node
            });
            except(leaf.getPath()).to.be.equal('/a/b');
        });

        it('should be ok to get slash leaf path', function () {
            let root = new Node('/');
            let node = new Node('a', {
                parent: root
            });
            let leaf = new Node('/', {
                parent: node
            });
            except(leaf.getPath()).to.be.equal('/a/');
        });

        it('should be ok to get middle node path', function () {
            let root = new Node('/');
            let node = new Node('a', {
                parent: root
            });
            let leaf = new Node('/', {
                parent: node
            });
            except(node.getPath()).to.be.equal('/a');
        });

    });

});
