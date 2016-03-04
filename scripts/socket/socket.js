// sockets.js
var socketio = require('socket.io')

module.exports.listen = function(app){
    io = socketio.listen(app)

	io.on('connection', function(socket) {
  		console.log("A User Connected");

  		socket.on('chat message', function(data) {
  			console.log(data.user + ': ' + data.msg);
    		io.emit('chat message', data.msg, data.user);
  		});

  		socket.on('disconnect', function() {
    		console.log("A User Disconnected");
  		});

	});

    return io;
}