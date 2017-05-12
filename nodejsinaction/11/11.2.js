/**
 * Created by zhangyue on 2017/5/11.
 */


//hogan
var hogan = require('hogan.js');
// var template = '{{message}}';
// var context = {message:'Hello template'};

var context = {
	students:[
		{name:'Jane Narwhal',age:21},
		{name:'Rick LaRue',age:26}
	]
};
var template = '{{#students}}<p>Name:{{name}},Age: {{age}} years old</p>{{/students}}';

var template = hogan.compile(template);
console.log(template.render(context));




