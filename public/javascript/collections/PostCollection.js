define(['backbone', 'models/PostModel'],
	function (Backbone, PostModel) {
		return Backbone.Collection.extend({
			name: 'posts',
			model: PostModel
		});
	}
);
