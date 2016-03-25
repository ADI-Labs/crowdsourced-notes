define(['jquery', 'underscore', 'backbone', 'stache!/templates/tree'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			events: {
				'click a.tree-list-item': 'select'
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
				console.log(this.collection.name);
				switch(this.collection.name) {
					case 'class': this.$el.html( template(
							{ class: this.collection.toJSON() }
						));
					case 'section': this.$el.html( template (
							{ section: this.collection.toJSON() }
						));
				}
				this.delegateEvents();
			},
			show: function() {
				this.$el.show();
			},
			hide: function() {
				this.$el.hide();
			},
			disableLinks: function() {
				this.linksEnabled = false;
			},
			enableLinks: function() {
				this.linksEnabled = true;
			},
			select: function(e) {
				console.log(e.currentTarget);
				var element = $(e.currentTarget);
				var id = element.attr('data-id');

				console.log(id);
				this.trigger("select", this.collection.findWhere({'_id':id}));
				if (!this.linksEnabled) e.preventDefault();
			}
		});
	}
);
