import async from './async.js';

mocha.setup('bdd');

let expect = chai.expect;
chai.should();

describe('test with sinon',()=>{
	it('test with spy',()=>{
		let ajaxSpy = sinon.spy(jQuery,'ajax');

		async.getUser((data)=>{
			// data.should.equal('小明');
		});

		console.log(ajaxSpy.callCount);
		sinon.assert.calledOnce(ajaxSpy);
		ajaxSpy.restore();

	})
});


describe('test with sinon',()=>{
	it('test with spy',()=>{
		let ajaxStub = sinon.stub(jQuery,'post');
		ajaxStub.yields();

		let callback = sinon.spy(()=>{
			console.log(JSON.stringify({user:{name:'小明'}}));
		});

		async.getUserByPost(callback);

		console.log(ajaxStub.callCount)
		console.log(callback.callCount);
		ajaxStub.restore();

	})
});


mocha.run();