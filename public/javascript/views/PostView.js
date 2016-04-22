define(['jquery',
	'underscore',
	'backbone',
	'moment',
	'views/components/TagView',
	'stache!/templates/post'],
	function ($, _, Backbone, moment, TagView, template) {
		return Backbone.View.extend({
			initialize: function (params) {
				this.post = params.post;
				this.tagView = new TagView({});
				this.options = params.options ? params.options : {};
				this.options.success = function (model, response, options) {
					var date = moment(model.get('postedOn'), moment.ISO_8601).fromNow();
					var comments = _.map(model.get('comments'), function(element) {
						return {
							date: moment.unix(element.date).fromNow(),
							user: element.user,
							content: _.escape(element.content)
						};
					});
					model.set({postedOn: date, comments: comments});
				};
				this.listenTo(this.post, 'sync change', this.render);
				this.post.fetch(this.options);
			},
			render: function () {
				this.$el.html(template({
					post: this.post.toJSON(),
					htmlFormat: function () { return function (text, render) {
						return render(text).replace(/\n/gim, '<br />');
					}}
				}));
				console.log('this post\'s tags', this.post.attributes.tags);
				this.tagView.addTags(this.post.attributes.tags);
				this.tagView.$el = this.$el.find('#'+this.post.id+'-tags');
				this.tagView.render();
				this.tagView.disableEdit();
			}
		});
	}
);
