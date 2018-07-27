var jade = require('jade');
var fs = require('fs');
console.log(jade.renderFile('./18.jade',{pretty:true,a:true,b:false}));

// fs.writeFile('./2.html',jade.renderFile('./12.jade',{pretty:true}),function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('生成完毕');
//     }
// });

