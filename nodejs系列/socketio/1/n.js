var http = require('http');
var io = require('socket.io');

var server = http.createServer((req,res)=>{

});

server.listen(2183);
io.listen(server).on('connection',(user)=>{
    // console.log('有人来了~~');
    setInterval(()=>{
        user.emit('aaa',Math.random());
    },1000);
});