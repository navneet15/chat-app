var socket = io();

socket.on('connect', () => {
	// console.log('connected to the server');

	// socket.emit('createMessage', {
	// 	from: 'Client',
	// 	text: 'Hello!!! All'
	// });

});

socket.on('newMessage', (message) => {
	console.log(message);
});

socket.emit('createMessage', {
	from: 'frank',
	text: 'test'
}, function(data){
	console.log(data);
});

	
socket.on('disconnect', () => {
	console.log('disconnected from server');
});




$('form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function(){
		
	} );

})



