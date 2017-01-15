var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var chatting_users = {};

server.listen(3000);

app.get('/', function(req, res) 
{
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

	socket.on('new user', function(data, callback) {
		if(data in chatting_users) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			chatting_users[socket.nickname] = socket;

			io.sockets.emit('usernames', Object.keys(chatting_users));
		}
	});

	socket.on('send message', function(data) {
		io.sockets.emit('New Message', {msg: data, nick: socket.nickname});
	});

	socket.on('disconnect', function(data) {
		if(!socket.nickname)
			return;
		delete chatting_users[socket.nickname];
		io.sockets.emit('usernames', Object.keys(chatting_users));
	});

});