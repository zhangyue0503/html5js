const express = require('express');
const io = require('socket.io');

var server = express();
var http = require('http').Server(server);

var blood = 10000,max=10000;

// server.listen(2131);

// http.createServer((req,res)=>{

// });
server.use('/lll',(req,res)=>{
    console.log(1);
    res.send('40040');
});
http.listen(2131);

server.use('/',express.static('./'));

io.listen(http).on('connection',(user)=>{
    // user.emit('msg',1);
    user.emit('blood',[blood/max]);

    user.on('kill',str=>{
        var ran = Math.random()*5+5;
        blood -= ran; 
        user.emit('kill',[blood/max,ran]);
        user.broadcast.emit('kill',[blood/max,ran]);
    });
});