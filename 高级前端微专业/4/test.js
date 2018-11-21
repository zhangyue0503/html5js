import {approve} from './resp.js';

mocha.setup('bdd');

let expect = chai.expect;
chai.should();
let assert = chai.assert;

describe('approve when amount < 5',function(){

	// before(()=>{
	// 	console.log('before');
	// });
	// after(()=>{
	// 	console.log('after')
	// });
	// beforeEach(()=>{
	// 	console.log('before each');
	// });
	// afterEach(()=>{
	// 	console.log('after each');
	// });
	console.log(approve({amount:3}));
	it('amount < 5',function(){
		approve({amount:3}).should.eql('主任审批通过！');
	});

});

// describe('test approve',function(){
// 	it('amount = 5',function(){
// 		expect(approve({amount:5})).to.eql('董事长审批通过！');
// 	});
// });

mocha.run();