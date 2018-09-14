const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const Multer = require('multer');


const server = express();
const loginRouter = express.Router();
const showRouter = express.Router();

server.listen('9111');

server.use(Multer({
    dest: './wp/allFile'
}).any());

server.use('/login', loginRouter);
server.use('/show', showRouter);


showRouter.use('/addDownload', (req, res) => {
    var Pool = mysql.createPool({
        'host': 'localhost',
        'user': 'root',
        'pass': '',
        'database': 'nodetest'
    });
    Pool.getConnection((err, c) => {
        if (err) {
            console.log(err);
            res.send({
                'ok': 0,
                'msg': '链接失败'
            });
        } else {
            c.query('select download from `allFiles` where hashName="'+req.query.hash+'" and user="'+req.query.user+'"', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '数据库链接失败'
                    });
                    c.release();
                } else {
                    var d = Number(data[0].download)+1;
                    c.query('update `allFIles` set download="'+d+'" where hashName="'+req.query.hash+'" and user="'+req.query.user+'"',(err,data)=>{
                        if (err) {
                            console.log(err);
                            res.send({
                                'ok': 0,
                                'msg': '数据库链接失败'
                            });
                            c.release();
                        } else {
                            c.query('update `'+req.query.user+'` set download="'+d+'" where hashName="'+req.query.hash+'"',(err,data)=>{
                                if (err) {
                                    console.log(err);
                                    res.send({
                                        'ok': 0,
                                        'msg': '数据库链接失败'
                                    });
                                } else {
                                    res.send({
                                        'ok': 1,
                                        'msg': '下载成功'
                                    });
                                }
                                c.release();
                            });
                        }
                    });
                }
           
            });
        }
    });
});


showRouter.use('/showPage', (req, res) => {
    var Pool = mysql.createPool({
        'host': 'localhost',
        'user': 'root',
        'pass': '',
        'database': 'nodetest'
    });
    Pool.getConnection((err, c) => {
        if (err) {
            console.log(err);
            res.send({
                'ok': 0,
                'msg': '链接失败'
            });
        } else {
            c.query('select *  from `allFiles`', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '数据库链接失败'
                    });
                    c.release();
                } else {
                    res.send({
                        'ok': 1,
                        'msg': '查询成功',
                        data: data
                    });
                }
                c.release();
            });
        }
    });
});

loginRouter.use('/removeFile', (req, res) => {
    // console.log(req.query);
    fs.unlink('./allFile/' + req.query.hash, (err) => {
        if (err) {
            console.log(err);
            res.send({
                ok: 0,
                msg: '删除失败'
            });
        } else {
            var Pool = mysql.createPool({
                'host': 'localhost',
                'user': 'root',
                'pass': '',
                'database': 'nodetest'
            });
            Pool.getConnection((err, c) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '链接失败'
                    });
                } else {
                    c.query('delete from `' + req.query.user + '` where hashName="' + req.query.hash + '"', (err) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                'ok': 0,
                                'msg': '删除失败'
                            });
                            c.release();
                        } else {
                            c.query('delete from `allFiles` where hashName="' + req.query.hash + '" and `user`="' + req.query.user + '"', (err) => {
                                if (err) {
                                    console.log(err);
                                    res.send({
                                        'ok': 0,
                                        'msg': '删除失败'
                                    });

                                } else {
                                    res.send({
                                        'ok': 1,
                                        'msg': '删除成功'
                                    });
                                }
                                c.release();
                            });
                        }
                    });
                }
            });
        }
    })
});

loginRouter.use('/getfiles', (req, res) => {
    console.log(req.files[0]);
    var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    var hashName = req.files[0].filename + path.parse(req.files[0].originalname).ext;
    var thisTime = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
    fs.rename(req.files[0].path, newName, (err) => {
        if (err) {
            console.log(err);
            c.end();
        } else {
            var Pool = mysql.createPool({
                'host': 'localhost',
                'user': 'root',
                'pass': '',
                'database': 'nodetest'
            });
            Pool.getConnection((err, c) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '链接失败'
                    });
                } else {
                    c.query('INSERT INTO `' + req.body.Fsnames + '` (`lastName`,`hashName`,`size`,`type`,`download`,`lastTime`) VALUES("' + req.files[0].originalname + '","' + hashName + '",' + req.files[0].size + ',"' + path.parse(req.files[0].originalname).ext + '",0,"' + thisTime + '");', (err, data) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                'ok': 0,
                                'msg': '存储失败'
                            });
                            c.end();
                        } else {

                            c.query('INSERT INTO `allFiles` (`lastName`,`hashName`,`size`,`type`,`download`,`lastTime`,`user`) VALUES("' + req.files[0].originalname + '","' + hashName + '",' + req.files[0].size + ',"' + path.parse(req.files[0].originalname).ext + '",0,"' + thisTime + '","' + req.body.Fsnames + '");', (err, data) => {
                                if (err) {
                                    console.log(err);
                                    res.send({
                                        'ok': 0,
                                        'msg': '存储失败'
                                    });
                                } else {
                                    res.send({
                                        'ok': 1,
                                        'msg': '上传成功',
                                        hash: hashName,
                                        timer: thisTime
                                    });
                                }
                                c.end();
                            });
                        }

                    });
                }
            });

        }
    });
});

//注册
loginRouter.use('/login', (req, res) => {
    // console.log(req.query);
    var Pool = mysql.createPool({
        'host': 'localhost',
        'user': 'root',
        'pass': '',
        'database': 'nodetest'
    });
    Pool.getConnection((err, c) => {
        if (err) {
            console.log(err);
            res.send({
                'ok': 0,
                'msg': '链接失败'
            });
        } else {
            c.query('SELECT user,pass FROM usertab where user="' + req.query.user + '" and pass="' + req.query.pass + '"', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '链接失败'
                    });
                    c.end();
                } else {
                    if (data.length > 0) {
                        c.query('select LastName,hashName,size,lastTime,download from `' + req.query.user + '`', (err, data) => {
                            if (err) {
                                console.log(err);
                                res.send({
                                    'ok': 0,
                                    'msg': '数据库链接失败'
                                });
                            } else {
                                res.send({
                                    'ok': 1,
                                    'msg': '登录成功',
                                    data: data
                                });
                            }
                            c.end();
                        });
                    } else {
                        res.send({
                            'ok': 0,
                            'msg': '用户名或密码错误'
                        });
                        c.end();
                    }
                }
            });
        }
    });
});

loginRouter.use('/res', (req, res) => {
    // console.log(req.query);
    var Pool = mysql.createPool({
        'host': 'localhost',
        'user': 'root',
        'pass': '',
        'database': 'nodetest'
    });
    Pool.getConnection((err, c) => {
        if (err) {
            console.log(err);
            res.send({
                'ok': 0,
                'msg': '链接失败'
            });
        } else {
            c.query('SELECT user FROM usertab where user="' + req.query.user + '"', (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({
                        'ok': 0,
                        'msg': '链接失败'
                    });
                    c.end();
                } else {
                    if (data.length > 0) {
                        res.send({
                            'ok': 0,
                            'msg': '用户名已占用'
                        });
                        c.end();
                    } else {
                        c.query("insert into usertab(`user`,`pass`) values('" + req.query.user + "','" + req.query.pass + "')", (err, data) => {
                            if (err) {
                                res.send({
                                    'ok': 0,
                                    'msg': '链接失败'
                                });
                                c.end();
                            } else {


                                c.query(`CREATE TABLE ${req.query.user}
                                (
                                ID int(255) NOT NULL AUTO_INCREMENT,
                                LastName varchar(255) NOT NULL,
                                hashName varchar(255) NOT NULL,
                                lastTime varchar(255) NOT NULL,
                                type varchar(255),
                                size varchar(255) NOT NULL,
                                download varchar(255) NOT NULL,
                                PRIMARY KEY (ID)
                            )`, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send({
                                            'ok': 1,
                                            'msg': '注册成功'
                                        });
                                    }
                                    c.end();
                                });
                            }

                        });

                    }
                }
            });
        }
    });
});

server.use('/', express.static('./wp'));