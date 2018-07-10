var http = require('http'),
fs = require('fs'),
urlLib = require('url');

http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');

    var json = urlLib.parse(req.url,true).query;
    // console.log(json);
    fs.writeFile(json.fname+'.html',json.inner,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('生成成功....');
            res.write('生成成功');
        }
        res.end();
    });
    
}).listen(2729);