import { rest } from '../../src/middleware/RESTParser.js';

let except = chai.expect;
let RESTParser = rest({
    matchers: [
        '/user/:uid',
        '/group/:gid'
    ]
});

describe('RESTParser', function () {

    describe('#exec', function () {
        let uid = '123456';
        it('should be ok to parse end rest parameter', function (done) {
            let context = {
                request: new URL('http://a.b.com/#/user/'+uid)
            };
            let inst = new RESTParser(
                function () {
                    let ret = context.request.restParams.uid;
                    except(ret).to.equal(uid);
                    done();
                }
            );
            inst.exec(context);
        });

        it('should be ok to parse middle rest parameter', function (done) {
            let context = {
                request: new URL('http://a.b.com/#/user/'+uid+'/profile')
            };
            let inst = new RESTParser(
                function () {
                    let ret = context.request.restParams.uid;
                    except(ret).to.equal(uid);
                    done();
                }
            );
            inst.exec(context);
        });

    });

});
