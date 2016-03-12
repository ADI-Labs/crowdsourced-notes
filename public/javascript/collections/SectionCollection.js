define(
	'collections/Section',
	['jquery', 'underscore', 'backbone', 'models/User'],
	function ($, _, Backbone, SectionModel) {
		return Backbone.model.extend({
			name: 'sections',
			model: SectionModel
		});
	}
);
