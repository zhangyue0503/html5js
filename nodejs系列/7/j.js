var jade = require('jade');
var fs = require('fs');
var str = jade.renderFile('./7.jade',{pretty:true});
// var str = jade.render('input');

console.log(str);
// fs.writeFile('./build/1.html',str,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('成功');
//     }
// });
