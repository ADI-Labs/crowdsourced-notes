define(['jquery', 'underscore', 'backbone', 'models/ClassModel'],
	function ($, _, Backbone, ClassModel) {
		return Backbone.Collection.extend({
			name: 'class',
			model: ClassModel,
			references: 'sections'
		});
	}
);
