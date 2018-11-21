import { Monitor } from "../../src/disp/Monitor.js"

let except = chai.expect;

describe('Monitor', function () {

    describe('#start', function () {
        it('should be ok to start monitor', function (done) {
            let source = {test:''};
            let value = 'test new value';

            let inst = new Monitor({
                key: 'test',
                source: source,
                interval: 50
            });
            inst.start();

            inst.on('change',function (event) {
                except(event.oldValue).to.equal('');
                except(event.newValue).to.equal(value);
                done();
            });

            source.test = value;
        });
    });

});

