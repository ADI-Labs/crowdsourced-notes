define(
	'models/Section',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.model.extend({
			name: 'section',
			defaults: {
				id: null,
				title: null,
				section_code: null,
				professor: null,
				lectures: []
			}
		});
	}
);
