define(['jquery',
	'underscore',
	'backbone',
	'stache!/templates/navbar'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			events: {
				'click .search-nav': 'navToSearch',
				'keyup .search-box': 'search'
			},
			initialize: function () {
				this.render();
			},
			render: function () {
				this.$el.html(template());
				this.delegateEvents();
			},
			setTitle: function (title) {
				console.log(title);
				this.title = title;
				this.$el.find('#page-head').val(title).attr({
					'readonly': '',
					'disabled': ''
				});
				this.$el.find('.navbuttons a').removeClass('selected');
			},
			navToSearch: function (e) {
				this.$el.find('#page-head').removeAttr('disabled')
					.removeAttr('readonly').val('').attr('placeholder', 'search')
					.focus();
				this.$el.find('.navbuttons a').removeClass('selected');
				this.$el.find('.search-nav').addClass('selected');
			},
			search: function (e) {
				var searchTerm = this.$el.find('#page-head').val();
				location.hash = '#/search/' + searchTerm;
			}
		});
	}
);
