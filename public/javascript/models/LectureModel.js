define(['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.Model.extend({
			name: 'lecture',
			defaults: {
				id: null,
				date: null,
				section: null,
				title: null,
				professor: null,
				posts: []
			},
			idAttribute: "_id",
			parse: function (response, options) {
				if (_.isArray(response)) {
					return response[0];
				} return response;
			},
			references: 'posts'
		});
	}
);
