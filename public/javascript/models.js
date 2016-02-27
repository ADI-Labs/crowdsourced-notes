/**
  * Here the models are defined, as well as the reimplementation of
  * Backbone.sync() that allows for use of WebSocket
**/
var UserModel = Backbone.model.extend({
	name: "user",
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
	name: "users",
	model: UserModel
});

var PostModel = Backbone.model.extend({
	name: "post",
	defaults: {
		id: null,
		title: null,
		content: null,
		date: null,
		postedOn: null
		upvotes: null,
		comments: [],
		tags: []
	}
});

var PostCollection = Backbone.model.extend({
	name: "posts",
	model: PostModel
});

var ClassModel = Backbone.model.extend({
	name: "class",
	defaults: {
		id: null,
		title: null,
		course_code: null,
		semester: null,
		sections: []
	}
});

var ClassCollection = Backbone.model.extend({
	name: "classes",
	model: ClassModel
});

var SectionModel = Backbone.model.extend({
	name: "section",
	defaults: {
		id: null,
		title: null,
		section_code: null,
		professor: null,
		lectures: []
	}
});

var SectionCollection = Backbone.model.extend({
	name: "sections",
	model: SectionModel
});

var LectureModel = Backbone.model.extend({
	name: "lecture",
	defaults: {
		id: null,
		title: null,
		profesor: null,
		posts: []
	}
});

var LectureCollection = Backbone.model.extend({
	name: "lectures",
	model: LectureModel
});
