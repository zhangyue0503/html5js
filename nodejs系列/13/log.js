var express = require('express');
var mysql = require('mysql');
var static =  require('express-static');

var server = express();
server.listen(2133);

server.use('/res',function(req,res){
    var Pool = mysql.createPool({
        'host':'localhost',
        'user':'root',
        'password':'',
        'database':'nodejsxilie'
    });

    Pool.getConnection(function(err,connection){
        if(err){
            console.log(err);
        }else{
            connection.query("select user from usertab where user ='"+req.query.user+"'",function(err,data){
                if(err){
                    console.log(err);
                }else{
                    if(data.length>0){
                        res.send('用户名已存在');
                    }else{
                        connection.query("insert into usertab(user,pass) values('"+req.query.user+"','"+req.query.pass+"')",function(err,data){
                            if(err){
                                console.log(err);
                            }else{
                                connection.release();
                                res.send('注册成功');
                            }
                        });
                    }
                }
            });
        }
    });

});

server.use('/log',function(req,res){
    var Pool = mysql.createPool({
        'host':'localhost',
        'user':'root',
        'password':'',
        'database':'nodejsxilie'
    });

    Pool.getConnection(function(err,connection){
        if(err){
            console.log(err);
        }else{
            connection.query("select user from usertab where user ='"+req.query.user+"' and pass = '"+req.query.pass+"'",function(err,data){
                if(err){
                    console.log(err);
                }else{
                    if(data.length > 0){
                        res.send('登录成功');
                    }else{
                        res.send('登录失败');
                    }
                    connection.release();
                }
            });
        }
    });
});

server.use(static('./lib'));