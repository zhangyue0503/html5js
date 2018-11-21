const fs = require('fs');
const htmllint = require('htmllint');
const html = fs.readFileSync('./工程规范-html-lint.html','utf-8');
// const lintOptions = {
// 	'class-style':'dash'
// }
// htmllint(html,lintOptions).then(out =>{
// 	console.log(out);
// });

htmllint(html).then(out =>{
	console.log(out);
});