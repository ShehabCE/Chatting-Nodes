var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var chatting_users = {};//app.set('port', (process.env.PORT || 3000));

server.listen(process.env.PORT || 3000);

app.use(express.static('public'));
app.use(require('./routes/routes'));
//TODO: Fix views routing...
app.set('views', '/views');

//TODO: Add Private Messaging...
io.sockets.on('connection', function(socket){

	socket.on('new user', function(data, callback) {
		if(data in chatting_users) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			chatting_users[socket.nickname] = socket;

			io.sockets.emit('usernames', Object.keys(chatting_users));
			socket.broadcast.emit('New Message', {msg: "("+ socket.nickname + ") has joined the room!", nick: "Server"});
		}
	});

	socket.on('send message', function(data) {
		io.sockets.emit('New Message', {msg: data, nick: socket.nickname});
	});

	socket.on('disconnect', function(data) {
		if(!socket.nickname)
			return;
		socket.broadcast.emit('New Message', {msg: "("+ socket.nickname + ") has left the room!", nick: "Server"});
		delete chatting_users[socket.nickname];
		io.sockets.emit('usernames', Object.keys(chatting_users));
	});

});