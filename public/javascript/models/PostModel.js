define(
	'models/Post',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.model.extend({
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
	}
);
