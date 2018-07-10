var fs = require('fs');

fs.unlink('./1231',function(err){
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});