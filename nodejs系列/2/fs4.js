var fs = require('fs');

fs.readFile('http://www.zyblog.net/post-279.html',function(err,data){
    if(err)console.log(err);
    
    fs.writeFile('1.html',data,function(err){
        if(err)console.log(err);
        
    });
});