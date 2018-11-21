import { ensure } from '../../src/umi/util/loader.js';

let except = chai.expect;

describe('loader', function () {

    // describe('.loadModule', function () {
    //     it('should be ok to load module', function (done) {
    //         loadModule('./m1/module.html').then(function(ret){
    //             console.log(ret);
    //             done();
    //         });
    //     });
    // });

    describe('.ensure', function () {
        it('should be ok to load one module', function (done) {
            ensure(['./m1/module.html']).then(function (list) {
                except(list.length).to.be.eql(1);
                done();
            });
        });
        it('should be ok to load duplicate module', function (done) {
            ensure(['./m1/module.html','./m1/module.html']).then(function (list) {
                except(list.length).to.be.eql(2);
                except(list[0]===list[1]).to.be.true;
                done();
            });
        });
        it('should be ok to load multi modules', function (done) {
            ensure(['./m1/module.html','./m2/module.html']).then(function (list) {
                except(list.length).to.be.eql(2);
                done();
            });
        });
    })
});
