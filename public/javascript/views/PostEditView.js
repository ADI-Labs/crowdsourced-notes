define(['jquery',
	'underscore',
	'backbone',
	'views/TreeView',
	'stache!/templates/postedit'],
	function ($, _, Backbone, TreeView, template) {
		return Backbone.View.extend({
			initialize: function (params) {
				this.classTree = new TreeView({
					collection: params.classes
				});
				this.sectionTree = new TreeView({
					collection: params.sections
				});
				this.post = params.post;
				this.post.fetch();
			},
			render: function () {
				this.$el.html( template({
					post: this.post.toJSON()
				}));
				this.classTree.$el = this.$el.find("#class-tree");
				this.sectionTree.$el = this.$el.find("#section-tree");
				this.classTree.render();
				this.sectionTree.render();
			}
		});
	}
);
