define(['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone) {
		return Backbone.Model.extend({
			name: 'section',
			defaults: {
				_id: null,
				title: null,
				section_code: null,
				professor: null,
				lectures: []
			},
			idAttribute: "_id",
			parse: function (response, options) {
				if (_.isArray(response)) {
					return response[0];
				} return response;
			}
		});
	}
);
