/**
  * Here the models are defined, as well as the reimplementation of
  * Backbone.sync() that allows for use of WebSocket
**/
var UserModel = Backbone.model.extend({
	name: 'user',
	defaults: {
		id: null,
		email: null,
		full_name: null,
		createdAt: null,
		classes: [],
		posts: []
	}
});

var UserCollection = Backbone.model.extend({
	name: 'users',
	model: UserModel
});

var PostModel = Backbone.model.extend({
	name: 'post',
	defaults: {
		id: null,
		title: null,
		content: null,
		date: null,
		postedOn: null,
		upvotes: null,
		comments: [],
		tags: []
	}
});

var PostCollection = Backbone.model.extend({
	name: 'posts',
	model: PostModel
});

var ClassModel = Backbone.model.extend({
	name: 'class',
	defaults: {
		id: null,
		title: null,
		course_code: null,
		semester: null,
		sections: []
	}
});

var ClassCollection = Backbone.model.extend({
	name: 'classes',
	model: ClassModel
});

var SectionModel = Backbone.model.extend({
	name: 'section',
	defaults: {
		id: null,
		title: null,
		section_code: null,
		professor: null,
		lectures: []
	}
});

var SectionCollection = Backbone.model.extend({
	name: 'sections',
	model: SectionModel
});

var LectureModel = Backbone.model.extend({
	name: 'lecture',
	defaults: {
		id: null,
		title: null,
		profesor: null,
		posts: []
	}
});

var LectureCollection = Backbone.model.extend({
	name: 'lectures',
	model: LectureModel
});

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
