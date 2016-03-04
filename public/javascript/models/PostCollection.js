define(
	'collections/Post',
	['jquery', 'underscore', 'backbone', 'models/Post'],
	function ($, _, Backbone, PostModel) {
		return Backbone.model.extend({
			name: 'posts',
			model: PostModel
		});
	}
);
