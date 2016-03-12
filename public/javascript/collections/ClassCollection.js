define(
	'collections/Class',
	['jquery', 'underscore', 'backbone', 'models/Class'],
	function ($, _, Backbone, ClassModel) {
		return Backbone.model.extend({
			name: 'classes',
			model: ClassModel
		});
	}
);
