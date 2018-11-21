import { router } from '../../src/middleware/Router.js';
import { Module } from "../../src/module/Module.js";

class Test extends Module {
    build(options) {
        // do nothing
    }
    show(context) {
        // do nothing
    }
    refresh(context) {
        // do nothing
    }
    hide() {
        // do nothing
    }
}

let except = chai.expect;

describe('Router', function () {

    describe('#exec', function () {
        it('should be ok to route module lifecycle build->show', function () {
            let ret = [];
            let checker = ['build','show'];

            let Router = router({
                routes: {
                    '/user/': Test,
                    '/group/': Test
                }
            });
            let inst = new Router(null, {
                build: function (event) {
                    ret.push('build');
                },
                show: function (event) {
                    ret.push('show');

                }
            });

            inst.exec({
                request: new URL('http://a.b.com/user/')
            });
            except(ret).to.be.eql(checker);
        });

        it('should be ok to route module lifecycle build->show->refresh', function () {
            let ret = [];
            let checker = ['build','show','refresh'];

            let Router = router({
                routes: {
                    '/user/': Test,
                    '/group/': Test
                }
            });
            let inst = new Router(null, {
                build: function (event) {
                    ret.push('build');
                },
                show: function (event) {
                    ret.push('show');
                },
                refresh: function (event) {
                    ret.push('refresh');
                }
            });

            let context = {
                request: new URL('http://a.b.com/user/')
            };
            inst.exec(context);
            inst.exec(context);

            except(ret).to.be.eql(checker);
        });

        it('should be ok to route module lifecycle build->show->build->hide->show', function () {
            let ret = [];
            let checker = ['build','show','build','hide','show'];

            let Router = router({
                routes: {
                    '/user/': Test,
                    '/group/': Test
                }
            });
            let inst = new Router(null, {
                build: function (event) {
                    ret.push('build');
                },
                show: function (event) {
                    ret.push('show');
                },
                hide: function (event) {
                    ret.push('hide');
                }
            });

            inst.exec({
                request: new URL('http://a.b.com/user/')
            });
            inst.exec({
                request: new URL('http://a.b.com/group/')
            });
            except(ret).to.be.eql(checker);
        });

    });

});
