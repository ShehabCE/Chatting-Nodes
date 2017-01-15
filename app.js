var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var nicknames = [];

server.listen(3000);

app.get('/', function(req, res) 
{
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

	socket.on('new user', function(data, callback) {
		if(nicknames.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			io.sockets.emit('usernames', nicknames);
		}
	});

	socket.on('send message', function(data) {
		io.sockets.emit('New Message', data);
	});

	socket.on('disconnect', function(data) {
		if(!socket.nickname)
			return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		io.sockets.emit('usernames', nicknames);
	});

});