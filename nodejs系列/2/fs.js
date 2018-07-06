var fs = require('fs');

fs.writeFile('aaa.txt','今天天不错',function(err){
    if(err)console.log(err);
    console.log('写入完毕...请您查看.');
});