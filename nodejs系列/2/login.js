var http = require('http'),
urlLib = require('url');

var allDate = {};
http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');

    var json = urlLib.parse(req.url,true).query;
    // console.log(json);
    
    if(allDate[json.user]){
        res.write('用户名已注册');
    }else{
        allDate[json.user] = json.pass;
        res.write('恭喜您，注册成功');
    }
    
    // console.log(allDate);
    res.end();

}).listen(2871);

http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var json = urlLib.parse(req.url,true).query;

    if(allDate[json.user] == json.pass){
        res.write('登录成功');
    }else{
        res.write('用户名或密码错误');
    }
    res.end();
}).listen(2872);