// sockets.js
var socketio = require('socket.io')
var User = require('../models/Users');
var Post = require('../models/Posts');

module.exports.listen = function(app){
    io = socketio.listen(app)

	io.on('connection', function(socket) {
  		console.log("A User Connected");

  		socket.on('chat message', function(data) {
  			console.log(data.user + ': ' + data.msg);
    		io.emit('chat message', data.msg, data.user);
  		});

  		// socket.on('create', function(data) {
  		// 	console.log("Creating " + data.post.title);
      //
  		// 	var newPost = new Post();
  		// 	newPost.title = data.post.title;
  		// 	newPost.content = data.post.content;
      //
			// newPost.save(function(err) {
			// 	if (err)
			// 		throw err;
			// 	socket.emit('createFin', newPost);
			// });
  		// });


  		socket.on('disconnect', function() {
    		console.log("A User Disconnected");
  		});

	});

    return io;
}
