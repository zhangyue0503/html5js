import { Dispatcher } from "../../src/disp/Dispatcher.js"
import { MiddleWare } from "../../src/middleware/MiddleWare.js"

class Test extends MiddleWare {
    exec(context) {
        super.exec(context);
        return true;
    }
}

let except = chai.expect;

describe('Dispatcher', function () {

    describe('#dispatch', function () {
        it('should be ok to dispatch middleware', function () {
            let inst = new Dispatcher();
            inst.add(Test);
            except(inst.dispatch()).to.be.eql(true);
        });
    });

});

