define(['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.Model.extend({
			name: 'class',
			defaults: {
				id: null,
				title: null,
				course_code: null,
				semester: null,
				sections: []
			},
			references: 'sections'
		});
	}
);
