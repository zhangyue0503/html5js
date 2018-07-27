var express = require('express');
var static = require('express-static');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var server = express();
server.listen(8020);

server.use(cookieParser('asdfasdf'));
server.use('/cookieLogin',function(req,res,next){
    var json = req.signedCookies;
    if(json.user == undefined){
        res.send('自动登录失败');
        return;
    }
    var user = json.user.split('-')[0];
    var pass = json.user.split('-')[1];
    fs.readFile('./name.txt', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var jsonData = eval('(' + data + ')');
            if (jsonData[user] == pass) {
                res.send('登录成功');
            } else {
                res.send('用户名或密码错误');
            }
        }
    });
    
    console.log(json);
});

server.use('/login', function (req, res, next) {
    req.secret = 'asdfasdf';
    req.query.isCookie = eval(req.query.isCookie);
    fs.readFile('./name.txt', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var jsonData = eval('(' + data + ')');
            if (jsonData[req.query.user] == req.query.pass) {
                if(req.query.isCookie){
                    res.cookie('user',req.query.user+'-'+req.query.pass,{signed:true,maxAge:1000*60*5});
                }else{
                    res.clearCookie('user');
                }
                res.send('登录成功');
            } else {
                res.send('用户名或密码错误');
            }
        }
    });
});

server.use('/resign', function (req, res, next) {
    fs.readFile('./name.txt', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var jsonData = eval('(' + data + ')');
            if (jsonData[req.query.user]) {
                res.send('用户已存在');
            } else {
                jsonData[req.query.user] = req.query.pass;
                // console.log(jsonData);
                fs.writeFile('./name.txt', JSON.stringify(jsonData), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(111);
                        res.send('注册成功');
                    }
                });
            }
        }
    });
});

server.use(static('./'));