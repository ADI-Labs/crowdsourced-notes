define(['jquery', 'underscore', 'backbone', 'stache!/templates/tree'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			events: {
				'click a.tree-list-item': 'select',
				'click .tree-list-node.parent': 'expand',
				'keyup .tree-filter input': 'filter'
			},
			initialize: function () {
				this.listenTo(this.collection, 'sync change', this.render);
				this.collection.fetch({
					limit: 6
				});
				this.linksEnabled = true;
				this.render();
			},
			render: function () {
				switch (this.collection.name) {
					case 'class': this.$el.html(template(
							{ class: this.collection.toJSON() }
						)); break;
					case 'section': this.$el.html(template(
							{ section: this.collection.toJSON() }
						)); break;
				}
				this.delegateEvents();
			},
			show: function () {
				this.$el.show();
			},
			hide: function () {
				this.$el.hide();
			},
			disableLinks: function () {
				this.linksEnabled = false;
			},
			enableLinks: function () {
				this.linksEnabled = true;
			},
			select: function (e) {
				var element = $(e.currentTarget);
				var id = element.attr('data-id');
				var message = this.collection.findWhere({'_id': id});
				if (!message) this.collection.filter(function (model) {
					message = _.find(model.attributes.sections ? model.attributes.sections :
						model.attributes.lectures, function (m) {
							return m._id == id;
						});
				});
				this.trigger('select', message);
				if (!this.linksEnabled) e.preventDefault();
			},
			expand: function (e) {
				// Expanding and contracting functionality for tree nodes
				var element = $(e.currentTarget);
				var icon = element.children('i'); // This is the + or - expand icon
				if (icon.is('.expanded')) {
					// If icon was clicked and is expanded, change to a + and contract
					icon.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
					element.find('.children').hide();
				} else {
					// If icon was clicked and is contracted, change to a - and expand
					icon.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
					element.find('.children').show();
				}
				icon.toggleClass('expanded');
			},
			filter: function (e) {
				// Filtering the tree's elements
				var element = $(e.currentTarget);
				var contains = RegExp(element.val().trim(), 'i');
				// Iterate over the tree nodes and hide if they dont contain the filter
				this.$el.find('.tree-list-node.parent').each(function () {
					var parent = $(this);
					var i = contains.test(parent.children('.tree-list-item').text()) ||
						contains.test(parent.children('.tree-list-node .tree-list-item').text());
					if (i) {
						parent.show();
					} else {
						parent.hide();
					}
				});
			}
		});
	}
);
