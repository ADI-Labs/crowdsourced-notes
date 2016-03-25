define(['jquery',
	'underscore',
	'backbone',
	'stache!/templates/<template_name>'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			initialize: function () {
				this.listenTo(this.collection, 'sync change', this.render);
				this.collection.fetch();
				this.render();
			},
			render: function () {
				this.$el.html(template({users: this.collection.toJSON()}));
			}
		});
	}
);
