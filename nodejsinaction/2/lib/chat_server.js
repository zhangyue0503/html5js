/**
 * Created by zhangyue on 2017/4/21.
 */

var socketio    = require('socket.io');
var io;
var guestNumber = 1;
var nickNames   = {};
var namesUsed   = [];
var currentRoom = {};

exports.listen = function (server) {
	io = socketio.listen(server);//启动socket.io服务器，允许它搭载在已有的HTTP服务器上
	io.set('log level', 1);
	io.sockets.on('connection', function (socket) {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function () {
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name             = 'Guest' + guestNumber;//生成新呢称
	nickNames[socket.id] = name;//把用户呢称跟客户端连接ID关联上
	socket.emit('nameResult', {//让用户知道他们的呢称
		success : true,
		name    : name
	});
	namesUsed.push(name);//存放已经被占用的呢称
	return guestNumber + 1;//增加用来生成呢称的计数器
};
//进入聊天室
function joinRoom(socket, room) {
	socket.join(room);//让用户进入房间
	currentRoom[socket.id] = room;//记录用户的当前房间
	socket.emit('joinResult', {room : room});//让用户知道他们进入了新的房间
	socket.broadcast.to(room).emit('message', { //让房间里的其他用户知道有新用户进入了房间
		text : nickNames[socket.id] + ' has joind ' + room + '.'
	});
	var usersInRoom = io.sockets.clients(room);//确定有哪些用户在这个房间里
	if (usersInRoom.length > 1) {//如果不止一个用户在这个房间里，汇总下都是谁
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if (userSocketId != socket.id) {
				if (index > 0) {
					usersInRoomSummary += ",";
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
	}
	usersInRoomSummary += '.';
	socket.emit('message', {text : usersInRoomSummary});//将房间里其他用户的汇总发送给这个用户
};
//处理呢称变更请求
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function (name) {//添加nameAttempt事件的监听器
		if (name.indexOf('Guest') == 0) {//呢称不能以Guest开头
			socket.emit('nameResult', {
				success : false,
				message : 'Names cannot begin with "Guest".'
			});
		} else {
			if (namesUsed.indexOf(name) == -1) {//如果呢称还没注册就注册上
				var previousName      = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];//删掉之前用的呢称，让其他用户可以使用
				socket.emit('nameResult', {
					success : true,
					name    : name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message',{
					text:previousName+' is now known as '+name+'.'
				});
			} else {//如果呢称已经被占用，给客户端发送错误消息
				socket.emit('nameResult', {
					success : false,
					message : 'That name is already in use.'
				});
			}
		}
	});
};

//发送聊天消息
function handleMessageBroadcasting(socket){
	socket.on('message',function(message){
		socket.broadcast.to(message.room).emit('message',{
			text:nickNames[socket.id]+': '+message.text
		});
	});
};
//创建房间
function handleRoomJoining(socket){
	socket.on('join',function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket,room.newRoom);
	});
};
//用户断开连接
function handleClientDisconnection(socket){
	socket.on('disconnect',function(){
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
};
