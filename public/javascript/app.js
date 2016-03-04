define('app',
	['jquery', 'underscore', 'backbone', 'router'],
	function($, _, Backbone, Router) {
		var initialize = function() {
			Router.initialize();
		};

		return {
			initialize: initialize
		};
	}
);
// This is the reimplementation that will allows us to use WebSocket for fetch()
// read(), sync() etc. across Backbone
// Options should look like:
// {
//     attrs: {id:'...',title:'....'},
//     error: function () {},
//     success: function () {},
// }

Backbone.sync = function (method, model, options) {
	var response;
	var socket = io.connect('http://localhost:3000');

	switch (method) {
		case 'create':
			socket.emit(method, {
				model: model.name,
				data: options.attrs || model.toJSON()
			}, function (err, data) {
				if (err) {
					options.error(err);
					return false;
				}
				response = data;
				options.success(data);
			});
			break;
		case 'read':
			socket.emit(method, {
				model: model.name,
				data: options.attrs || model.toJSON()
			}, function (err, data) {
				if (err) {
					options.error(err);
					return false;
				}
				response = data;
				options.success(data);
			});
			break;
		case 'update':
			socket.emit(method, {
				model: model.name,
				data: options.attrs || model.toJSON()
			}, function (err, data) {
				if (err) {
					options.error(err);
					return false;
				}
				response = data;
				options.success(data);
			});
			break;
		case 'delete':
			socket.emit(method, {
				model: model.name,
				data: options.attrs || model.toJSON()
			}, function (err, data) {
				if (err) {
					options.error(err);
					return false;
				}
				response = data;
				options.success(data);
			});
			break;
		default:
			console.log('A valid method was not given to Backbone.sync()');
			return false;
	}
	return response;
};
