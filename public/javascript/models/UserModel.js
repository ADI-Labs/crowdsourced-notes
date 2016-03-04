define(
	'models/User',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.model.extend({
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
	}
);
