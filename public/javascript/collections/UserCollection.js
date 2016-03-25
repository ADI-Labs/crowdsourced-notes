define(['jquery', 'underscore', 'backbone', 'models/UserModel'],
	function ($, _, Backbone, UserModel) {
		return Backbone.Collection.extend({
			name: 'user',
			model: UserModel,
			parse: function(data) {
				return data;
			}
		});
	}
);
