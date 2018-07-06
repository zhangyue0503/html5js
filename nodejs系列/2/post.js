var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var str = '';
    req.on('data',function(data){
        str+=data;
        
    });
    req.on('end',function(){
        console.log(str);
        var json = querystring.parse(str);
        if(json.user == 'leo' && json.pass == '123456'){
            res.write('成功');
        }else{
            res.write('失败');
        }
        res.end();
    });

}).listen(2831);