var http = require('http');
var io = require('socket.io');

var server = http.createServer((req,res)=>{

});

server.listen(2183);

var arr = [];

io.listen(server).on('connection',(user)=>{

    arr.push(user);
    user.on('msg',(str)=>{
        // console.log(str);
        // user.emit('msg',str);
        for(var i=0;i<arr.length;i++){
            arr[i].emit('msg',str);
        }
    });

    // user.on('bbb',(str)=>{
    //     console.log(str);
    // });
});