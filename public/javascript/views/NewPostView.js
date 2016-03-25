define(['jquery',
	'underscore',
	'backbone',
	'views/PostEditView',
	'stache!/templates/newpost'],
	function ($, _, Backbone, PostEditView, template) {
		return Backbone.View.extend({
			initialize: function (params) {
				this.postEdit = new PostEditView({
					classes: params.classes,
					sections: params.sections,
					post: params.post
				});
				this.render();
			},
			render: function () {
				this.$el.html(template({title: "New note"}));
				this.postEdit.$el = this.$el.find('#create-new-post');
				this.postEdit.render();
			}
		});
	}
);
