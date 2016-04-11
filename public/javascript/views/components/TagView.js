define(['jquery',
	'underscore',
	'backbone',
	'stache!/templates/components/taginput'],
	function ($, _, Backbone, template) {
		return Backbone.View.extend({
			events: {
				'keydown .taginput-input': 'keydown',
				'click .taginput-tag-remove': 'removeTag'
			},
			initialize: function (params) {
				this.tags = _.extend({
					data: []
				}, params.tags ? params.tags : {});
				this.tags = _.extend(this.tags, Backbone.Events);
				this.tags.on('pushTag', this.pushTag);
				this.tags.on('popTag', this.popTag);
				this.tags.on('removeTag', this.removeTag);
			},
			render: function () {
				this.$el.html(template({tags: this.tags.data}));
				this.delegateEvents();
				this.recalc();
			},
			recalc: function () {
				if (!_.isEmpty(this.tags.data)) {
					var position = this.$el.find('.taginput-tag').last();
					position = position.position().left + position.innerWidth();
					this.$el.find('.taginput-input').css({
						'padding-left': Math.floor(position) + 'px'
					});
				} else {
					this.$el.find('taginput-input').css({
						'padding-left': '0.25em'
					});
				}
			},
			addTags: function (tags) {
				_.each(tags, function (tag) {
					if (!_.contains(this.tags.data, tag)) this.tags.data.push(tag);
				}, this);
			},
			pushTag: function (tag) {
				if (!_.isEmpty(tag) && !_.contains(this.tags.data, tag)) {
					this.tags.data.push(tag);
					this.render();
				}
			},
			popTag: function () {
				this.$el.find('taginput-tag').last().remove();
				this.tags.data.pop();
				this.render();
			},
			removeTag: function (e) {
				var tag = {
					name: $(e.currentTarget).siblings('.taginput-tag-body').children('a').text(),
					header: $(e.currentTarget).siblings('.taginput-tag-header').children('span').text()
				};
				tag = _.pick(tag, Boolean);
				this.tags.data = _.reject(this.tags.data, function (d) {
					if (_.isEqual(d, tag)) {return true; }
				});
				this.render();
			},
			keydown: function (e) {
				switch (e.which) {
					// backspace
					case 8:
						if (_.isEmpty($(e.currentTarget).val())) {this.popTag(); }
						break;
					// space, comma, enter
					case 32:
					case 188:
					case 13:
						this.pushTag({name: $(e.currentTarget).val().replace(/#|,| /, '')});
						$(e.currentTarget).html('').focus();
						break;
				}
			},
			disableEdit: function () {
				this.editsAllowed = false;
				this.$el.find('.taginput-tag-remove, .taginput-input').hide();
			}
		});
	}
);
