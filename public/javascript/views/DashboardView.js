define(['jquery',
	'underscore',
	'backbone',
	'views/PostListView',
	'stache!/templates/dashboard'],
	function ($, _, Backbone, PostListView, template) {
		return Backbone.View.extend({
			initialize: function (params) {
				this.recentPostList = new PostListView({
					collection: params.recentPosts,
					options: {
						sort: '+postedOn',
						limit: 3
					}
				});
				// this.listenTo(this.recentPosts, 'sync change', this.render);
				this.render();
			},
			render: function () {
				this.$el.html(template({
					title: 'Overview'
				}));
				this.recentPostList.$el = this.$el.find('#recent-posts');
				this.recentPostList.render();
			}
		});
	}
);
