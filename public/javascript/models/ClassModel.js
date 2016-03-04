define(
	'models/Class',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.model.extend({
			name: 'class',
			defaults: {
				id: null,
				title: null,
				course_code: null,
				semester: null,
				sections: []
			}
		});
	}
);
