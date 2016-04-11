var app = require('http').createServer(handler);
var io = require('../../scripts/socket/socket').listen(app);
var mongoose = require('mongoose');


app.listen(8080);

/**
	Http Handler
**/
function handler (req, res) {
	var body = "helloWorld";
	res.writeHead(200, {
		'Content-Length': body.length,
		'Content-Type': 'text/plain'
	});
	res.write(body);
	res.end('ok');

}



/**
	Set up test mongo database
**/
var config = {
	mongo: {
  		url: 'mongodb://test:tester@ds011409.mlab.com:11409/crowdnotes-test'
	}
};
// Import all of the models
mongoose.connect(config.mongo.url);
var models = {
	'user': require('../../scripts/models/Users'),
	'post': require('../../scripts/models/Posts'),
	'class': require('../../scripts/models/Classes'),
	'section': require('../../scripts/models/Sections'),
	'lecture': require('../../scripts/models/Lectures')
};

/**
	Set up socket connection
**/
io.on('connection', function (socket) {
	socket.on('read', function(data, callback) {
		console.log('read', data);
		var query = models[data.model].find(data.query);
		if (data.ref) { query = query.populate(data.ref); }
		if (data.sort) { query = query.sort(data.sort); }
		if (data.select) { query = query.select(data.select);}
		if (data.limit) { query = query.limit(data.limit)}

		query.exec(callback);
	});
	socket.on('create', function(data, callback) {
		console.log('create', data);
		models[data.model].create(data.data, callback);
	});
	socket.on('update', function(data, callback) {
		console.log('update', data);
		models[data.model].update(data.query, data.data, {multi: true}, callback);
	});
	socket.on('delete', function(data, callback) {
		console.log('delete', data);
		model[data.model].remove(data.query);
	});
});
