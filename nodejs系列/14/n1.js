var mysql = require('mysql');
var express = require('express');
var static = require('express-static');
var jade = require('jade');
var server  = express();
server.listen(3263);


server.use('/news',function(req,res){
    if(!req.query.id){
        res.send('参数错误');
        return;
    }

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
            connection.query("select * from a where ID="+req.query.id,function(err,data){
                if(err){
                    console.log(err);
                    res.send('查询失败');
                }else{console.log(data);
                    if(data.length > 0){
                        var str = jade.renderFile('./www/jade/2.jade',{pretty:true,arr:data});
                    res.send(str);
                    connection.release();
                    }else{
                        res.send('参数错误');
                    }
                }
            });
        }
    });
});

server.use('/list.html',function(req,res){
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
            connection.query("select ID,user,textName,time from a",function(err,data){
                if(err){
                    console.log(err);
                    res.send('查询失败');
                }else{
                    var str = jade.renderFile('./www/jade/1.jade',{pretty:true,arr:data});
                    res.send(str);
                    connection.release();
                }
            });
        }
    });
});

server.use('/getText',function(req,res){
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
            connection.query("insert into a(user,textName,time,`inner`) values('"+req.query.user+"','"+req.query.textName+"','"+req.query.time+"','"+req.query.inner+"')",function(err){
                if(err){
                    console.log(err);
                    res.send('发布失败');
                }else{
                    connection.release();
                    res.send('发布成功');
                }
            });
        }
    });
});

server.use(static('./www'));