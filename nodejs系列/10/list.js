var express =  require('express');
var jade = require('jade');

var listRouter = express.Router();

var server = express();

server.listen(8020);

var arr = [
    'aaaaaaaaa',
    'bbbbbbbbb',
    'ccccccccc',
    'ddddddddd',
    'eeeeeeeee',
    'fffffffff',
    'ggggggggg',
    'aaaaaaaaa-1',
    'bbbbbbbbb-1',
    'ccccccccc-1',
    'ddddddddd-1',
    'eeeeeeeee-1',
    'fffffffff-1',
    'ggggggggg-1',
    'aaaaaaaaa-2',
    'bbbbbbbbb-2',
    'ccccccccc-2',
    'ddddddddd-2',
    'eeeeeeeee-2',
    'fffffffff-2',
    'ggggggggg-2',
];

server.use('/list',listRouter);

listRouter.use('',function(req,res){
    // console.log(1);
    var needArr = arr.slice((req.query.page-1)*4,req.query.page*4);
    var maxLi = Math.ceil(arr.length/4);
    var str = jade.renderFile('./1.jade',{pretty:true,listArr:needArr,maxl:maxLi,index:req.query.page});

    res.send(str);
});