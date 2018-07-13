var http = require('http'),
    fs = require('fs'),
    urlLib = require('url'),
    querystring = require('querystring');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

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