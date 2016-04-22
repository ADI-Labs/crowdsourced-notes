define(['jquery',
	'underscore',
	'backbone',
	'collections/PostCollection',
	'views/PostListView',
	'stache!/templates/search'],
	function ($, _, Backbone, PostCollection, PostListView, template) {
		return Backbone.View.extend({
			initialize: function (params) {
				this.posts = params.posts;
				this.resultsView = new PostListView ({
					collection: new PostCollection(),
					noFetch: true
				});

				this.on('search', this.search);
				this.posts.on('search', function (results) {
					this.results = results;
					this.render();
				}.bind(this));

				this.posts.fetch({
					success: function () {
						this.search();
					}.bind(this)
				});

				this.render();
			},
			render: function () {
				this.waiting(false);
				var templ = _({
					searchTerm: this.searchTerm
				}).omit(function (value) {
					return _.isNull(value) || _.isUndefined(value);
				});
				this.$el.html(template(templ));
				if (this.results) {
					this.resultsView.collection
						.reset(this.results.models.slice(0,10));
					this.resultsView.$el = this.$el.find('#results-view');
					this.resultsView.render();
				}
			},
			search: function (term) {
				if (term) {
					this.searchTerm = term;
					this.posts.search(term, ['title', 'content', 'tags']);
					this.waiting(true);
				} else {
					this.posts.search(this.searchTerm, ['title', 'content', 'tags']);
				}
			},
			waiting: function (bool) {
				if (bool) {

				} else {

				}
			}
		});
	}
);
