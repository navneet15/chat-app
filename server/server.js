const path = require('path');
const http = require('http');

const express = require('express');
var socketIO = require('socket.io');

var publicPath = path.join(__dirname,'../public')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');


	socket.emit('newMessage', {
		from: 'Server',
		text: 'Hello!!! Client'
	});


	socket.on('createMessage', (message) => {
		console.log(message);
	});


	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});




server.listen(3000,() => {
	console.log(`Server is up and running on port ${port}`);
});