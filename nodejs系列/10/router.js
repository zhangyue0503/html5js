var express = require('express');

var server = express();

server.listen(8020);
var userRouter = express.Router();
var newsRouter = express.Router();

server.use('/user',userRouter);
server.use('/news',newsRouter);

userRouter.use('/leo',function(req,res){
    res.send('user leo');
});

userRouter.use('/sky',function(req,res){
    res.send('user sky');
});

newsRouter.use('/llll',function(req,res){
    res.send('news leo')
});


console.log(express);
