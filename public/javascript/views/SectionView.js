define(['jquery',
	'underscore',
	'backbone',
	'stache!/templates/section'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			initialize: function () {
				this.listenTo(this.model, 'sync change', this.render);
				this.model.fetch();
				this.render();
			},
			render: function () {
				console.log('section', this.model)
				this.$el.html(template({
					users: this.model.toJSON(),
					section: this.model.toJSON() 
				}));
			}
		});
	}
);
