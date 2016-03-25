define(['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.Model.extend({
			name: 'user',
			idAttribute: '_id',
			defaults: {
				googleID: null,
				email: null,
				name: null,
				created_at: null,
				classes: [],
				posts: []
			}
		});
	}
);
