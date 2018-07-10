var fs = require('fs');

fs.rename('./asdfasdf','ffff.txt',function(err){
    if(err){
        console.log('失败了：'+err);
    }else{
        console.log('修改成功');
    }
});