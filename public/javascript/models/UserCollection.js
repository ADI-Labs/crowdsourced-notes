define(
	'collections/User',
	['jquery', 'underscore', 'backbone', 'models/User'],
	function ($, _, Backbone, UserModel) {
		return Backbone.model.extend({
			name: 'users',
			model: UserModel
		});
	}
);
