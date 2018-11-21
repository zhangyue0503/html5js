import { rewrite } from '../../src/middleware/Rewrite.js';

let except = chai.expect;
let Rewrite = rewrite({
    rules: [
        {
            matcher: /\/user\/[\d]+(?=\/|$)/i,
            target: '/user/'
        },
        {
            matcher: /\/group\/[\d]+/i,
            target: '/group/'
        }
    ]
});

describe('Rewrite', function () {

    describe('#exec', function () {
        let upt = '/user/';
        it('should be ok to rewrite url with end rest parameter', function (done) {
            let context = {
                request: new URL('http://a.b.com'+upt+'123456')
            };
            let inst = new Rewrite(
                function () {
                    let ret = context.request.pathname;
                    except(ret).to.equal(upt);
                    done();
                }
            );
            inst.exec(context);
        });

        it('should be ok to rewrite url with middle rest parameter', function (done) {
            let context = {
                request: new URL('http://a.b.com'+upt+'123456/profile')
            };
            let inst = new Rewrite(
                function () {
                    let ret = context.request.pathname;
                    except(ret).to.equal(upt);
                    done();
                }
            );
            inst.exec(context);
        });

    });

});
