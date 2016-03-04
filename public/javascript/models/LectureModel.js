define(
	'models/Lecture',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.model.extend({
			name: 'lecture',
			defaults: {
				id: null,
				title: null,
				profesor: null,
				posts: []
			}
		});
	}
);
