var express = require('express');
var jade = require('jade');
var allArr = require('./data');


var server = express();
server.listen(2138);
var userRouter = express.Router();
var listRouter = express.Router();
var newsRouter = express.Router();

server.use('/user', userRouter);
server.use('/list', listRouter);
server.use('/news', newsRouter);

// console.log(allArr);

userRouter.use('', function (req, res, next) {
    
    var needPage = 0;
    if(req.query.page == '0'||!req.query.page){
        needPage = 0;
    }else{
        needPage = req.query.page;
    }

    var maxL = Math.ceil(allArr.user.length/3);
    
    if(req.query.page == undefined || req.query.page < 0){
        req.query.page = 0;
    }else{
        req.query.page = req.query.page;
    }


    var needArr = allArr.user.slice(req.query.page*3,req.query.page*3+3);

    var str = jade.renderFile('./1.jade', {
        pretty: true,
        DataArr: needArr,
        maxL:maxL,
        linkNode:'user',
        page:needPage
    });
    res.send(str);
});

listRouter.use('', function (req, res, next) {

    var needPage = 0;
    if(req.query.page == '0'||!req.query.page){
        needPage = 0;
    }else{
        needPage = req.query.page;
    }

    var maxL = Math.ceil(allArr.list.length/3);

    var needArr = !req.query.page?allArr.list.slice(0,3):allArr.list.slice(req.query.page*3,req.query.page*3+3);


    var str = jade.renderFile('./1.jade', {
        pretty: true,
        DataArr: needArr,
        maxL :maxL,
        linkNode:'list',
        page:needPage
    });
    res.send(str);
});

newsRouter.use('', function (req, res, next) {

    var needPage = 0;
    if(req.query.page == '0'||!req.query.page){
        needPage = 0;
    }else{
        needPage = req.query.page;
    }

    var maxL = Math.ceil(allArr.news.length/3);

    var needArr = !req.query.page?allArr.news.slice(0,3):allArr.list.slice(req.query.page*3,req.query.page*3+3);

    var str = jade.renderFile('./1.jade', {
        pretty: true,
        DataArr: needArr,
        maxL :maxL,
        linkNode:'news',
        page:needPage
    });
    res.send(str);
});


server.use('', function (req, res) {
    var str = jade.renderFile('./1.jade', {
        pretty: true
    });
    res.send(str);
});