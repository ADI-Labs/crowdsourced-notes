define(['jquery',
	'underscore',
	'backbone',
  'collections/PostCollection',
  'views/PostListView',
	'stache!/templates/lecture'],
	function ($, _, Backbone, PostCollection, PostListView, template) {
		return Backbone.View.extend({
			initialize: function () {
        this.postList = new PostListView({
          collection: new PostCollection(),
          noFetch: true
        });
				this.listenTo(this.model, 'sync change', this.render);
				this.model.fetch();
				this.render();
			},
			render: function () {
				this.$el.html(template({lecture: this.model.toJSON()}));
        this.postList.collection.reset(this.model.get('posts'));
        this.postList.$el = this.$el.find('#lecture-post-list');
        this.postList.render();
			}
		});
	}
);
