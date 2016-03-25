define(['jquery', 'underscore', 'backbone', 'models/UserModel'],
	function ($, _, Backbone, SectionModel) {
		return Backbone.Collection.extend({
			name: 'section',
			model: SectionModel
		});
	}
);
