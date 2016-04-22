define(['jquery',
	'underscore',
	'backbone',
	'moment',
	'views/components/TagView',
	'stache!/templates/post'],
	function ($, _, Backbone, moment, TagView, template) {
		return Backbone.View.extend({
			events : {
				'keydown .new-comment': "comment"
			},
			initialize: function (params){
				this.post = params.post;
				this.tagView = new TagView({});
				this.options = params.options ? params.options : {};
				// this.options.success = function (model, response, options) {
				// 	var date = moment(model.get('postedOn'), moment.ISO_8601).fromNow();
				// 	var comments = _.map(model.get('comments'), function(element) {
				// 		return {
				// 			date: moment.unix(element.date).fromNow(),
				// 			user: element.user,
				// 			content: _.escape(element.content)
				// 		};
				// 	});
				// 	model.set({postedOn: date, comments: comments});
				// };
				this.listenTo(this.post, 'sync change', this.render);
				this.post.fetch(this.options);
			},
			fixComments: function () {
				var comments = _.map(this.post.get('comments'), function(element) {
					return {
						date: moment.unix(element.date).fromNow(),
						user: element.user,
						content: _.escape(element.content)
					};
				});
				this.post.set({comments: comments});
			},
			render: function () {
				this.$el.html(template({
					post: this.post.toJSON(),
					htmlFormat: function () { return function (text, render) {
						return render(text).replace(/\n/gim, '<br />');
					}},
					fuzzyDate: function () { return function (text, render) {
						return moment.unix(render(text)).fromNow();
					}}
				}));
				this.tagView.addTags(this.post.attributes.tags);
				this.tagView.$el = this.$el.find('#'+this.post.id+'-tags');
				this.tagView.render();
				this.tagView.disableEdit();
				this.delegateEvents();
			},
			comment: function(e) {
				console.log(e.which);
				switch (e.which) {
					case 13:
						var newComment = this.post.get('comments').concat({
							user: 'Anonymous Coward',
							date: Date.now() / 1000,
							content: _.escape($(e.currentTarget).val())
						});
						this.post.save({'comments': newComment},
							{ attrs: {_id: this.post.id	} });
						break;
				}
			}
		});
	}
);
