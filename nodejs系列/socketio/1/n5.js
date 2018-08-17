var http = require('http');
var io = require('socket.io');

var server = http.createServer((req, res) => {

});

server.listen(2183);
var userArr = [];
var msgArr = [];
io.listen(server).on('connection', (user) => {
    user.on('name', (str) => {
        userArr.push(str);
        user.lastNames = str;
        user.broadcast.emit('user', userArr);
        user.emit('user', userArr);
        user.emit('allmsg',msgArr);
    });
    user.on('msg', (str) => {
        msgArr.push({
            userName: user.lastNames,
            msg: str,
            timer: new Date().toLocaleTimeString()
        });
        user.broadcast.emit('msg', {
            userName: user.lastNames,
            msg: str,
            timer: new Date().toLocaleTimeString()
        });
        user.emit('msg', {
            userName: user.lastNames,
            msg: str,
            timer: new Date().toLocaleTimeString()
        });

    });

    user.on('disconnect', () => {
        userArr.splice(userArr.indexOf(user.lastNames),1);
        user.broadcast.emit('userup', user.lastNames);
    });
});