define(['jquery',
	'underscore',
	'backbone',
	'moment',
	'stache!/templates/postlist'],
	function ($, _, Backbone, moment, template) {
		return Backbone.View.extend({
			events: {
				'click .star': 'star',
				'click .downvote': 'downvote',
				'click .upvote': 'upvote',
			},
			initialize: function (params) {
				this.delegateEvents();
				this.collection = params.collection;
				this.options = params.options;
				this.options.success = function (collection, response, options) {
					collection.each(function(model) {
						console.log('postedOn', model.get('postedOn'));
						var date = moment(model.get('postedOn')).fromNow();
						model.set({postedOn: date});
					});
				}
				this.collection.fetch(this.options);
				this.listenTo(this.collection, 'sync change', this.render);
			},
			render: function () {
				this.$el.html(template({posts: this.collection.toJSON()}));
				this.delegateEvents();
			},
			refresh: function () {
				this.collection.fetch(this.options);
			},
			star: function (e) {
				var u = (user || window.user) ? user : null;
				if (u) {
					u.star(
						this.collection.findWhere( {
							'_id': $(e.currentTarget).attr('data-id')
						}));
				}
				console.log("item clicked! ", e);
			},
			upvote: function(e) {

			},
			downvote: function(e) {

			}

		});
	}
);
