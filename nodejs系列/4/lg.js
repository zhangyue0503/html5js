var http = require('http'),
    fs = require('fs'),
    urlLib = require('url'),
    querystring = require('querystring');

var vip = {
    'Ly':123
};

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    if(vip[json.user]){
        res.write(`用户名已存在`);
        res.end();
        return;
    }

    fs.readFile("./帐号密码.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            var jsonData = eval('(' + data + ')');
            if (jsonData[json.user] == json.pass) {
                res.write('用户名已存在');
                res.end();
            } else {
                jsonData[json.user] = json.pass;
                fs.writeFile("./帐号密码.txt", JSON.stringify(jsonData), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.write('恭喜，注册成功');
                        res.end();
                    }
                });
            }
        }
    });

    // console.log(json.user,json.pass);


}).listen(9281);
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    if(vip[json.user] == json.pass){
        res.write('大人您可回来了');
        res.end();
        return;
    }


    fs.readFile("./帐号密码.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var jsonData = eval('(' + data + ')');
            if (jsonData[json.user] == json.pass) {
                res.write('登录成功');

            } else {
                res.write('登录失败');
            }
            res.end();
        }
    });

}).listen(9282);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    fs.readFile("./文章列表.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var arrData = eval('(' + data + ')');
            console.log(arrData);
            arrData.push(json.fileName);
            fs.writeFile('./文章列表.txt',JSON.stringify(arrData),function(err){
                if(err){
                console.log(err);
                }else{
                    res.write('发布成功');
                    res.end();

                    fs.writeFile('./文章列表/'+json.fileName+'.txt',json.inner,function(){
                        if(err){
                            console.log(err);
                        }
                    });
                }
                
            });
            
        }
    });

}).listen(9283);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    fs.readFile("./文章列表.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
            
        }
    });

}).listen(9284);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    fs.readFile("./文章列表/"+json.fileName+".txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });

}).listen(9285);


http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    fs.readFile("./帐号密码.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var allData = eval('('+data+')');
            var arr = [];
            for(var i in allData){
                arr.push(i);
            }
            res.write(JSON.stringify(arr));
            res.end();
            
        }
    });

}).listen(9290);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var json = urlLib.parse(req.url, true).query;
    fs.readFile("./帐号密码.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var allData = eval('('+data+')');
            delete allData[json.deleteName];
            fs.writeFile("./帐号密码.txt",JSON.stringify(allData),function(err){
                if(err){
                    console.log(err);
                }else{
                    res.write('删除成功');
                    res.end();
                }
            });
            
            
        }
    });

}).listen(9300);