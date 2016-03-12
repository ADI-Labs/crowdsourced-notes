define(['jquery',
	'underscore',
	'backbone',
	'stache!/templates/dashboard'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			initialize: function () {
				this.listenTo(this.collection, 'sync change', this.render);
				console.log(this.collection.fetch());
				this.render();
			},
			render: function () {
				this.$el.html("WHAT WHAT");
				this.$el.html(template({users: this.collection.toJSON()}));
			}
		});
	}
);
