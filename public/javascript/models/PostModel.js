define(['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.Model.extend({
			name: 'post',
			idAttribute: '_id',
			defaults: {
				id: null,
				title: null,
				content: null,
				date: null,
				postedOn: null,
				upvotes: null,
				comments: [],
				tags: []
			},
			parse: function (response, options) {
				if (_.isArray(response)) {
					return response[0];
				}
				return response;
			}
		});
	}
);
