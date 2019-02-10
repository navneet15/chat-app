const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public')
const app = express();
const server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;



var {generateMessage} = require('./utils/message')

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	//console.log('new user connected');


	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A user has joined'));

	socket.on('createMessage', (message,callback) => {
		//console.log(message);

		 // io.emit is used to send message to all the connected user inlcuding the user sending the message.
		io.emit('newMessage', generateMessage(message.from, message.text));   
		callback('sent');  

// socket.broadcast.emit emits the event to all the other user connected to the server except the user emitting the event.
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });     
	});
 


	// socket.emit('newMessage', {
	// 		from: 'server',
	// 		text: 'Hello!!! Client',
	// 		createdAt: new Date().getTime()
	// });

	socket.broadcast.emit('greet');

	
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});



});




server.listen(3000,() => {
	console.log(`Server is up and running on port ${port}`);
});