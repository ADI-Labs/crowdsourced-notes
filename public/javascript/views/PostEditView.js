define(['jquery',
	'underscore',
	'backbone',
	'views/TreeView',
	'views/components/TagView',
	'stache!/templates/postedit',
	'bootstrap',
	'lib/summernote/summernote'],
	function ($, _, Backbone, TreeView, TagView, template) {
		return Backbone.View.extend({
			events : {
				'click .note-save': 'submit',
				'click .note-discard': 'discard'
			},
			initialize: function (params) {
				params.bootstrapTags = params.bootstrapTags ? params.bootstrapTags : {};
				this.classTree = new TreeView({
					collection: params.classes
				});
				this.sectionTree = new TreeView({
					collection: params.sections
				});
				this.tagView = new TagView({
					tags: params.bootstrapTags
				});
				this.classTree.linksEnabled = this.sectionTree.linksEnabled = false;
				// Here i am linking the selection of section/topic in the tree to
				// corresponding tags
				this.classTree.on('select', function(msg) {
					if (msg.attributes) {
						return;
					}
					this.tagView.pushTag({
						name: msg.title, header: 'section'
					});
					this.tagView.pushTag({
						name: msg.professor, header: 'prof'
					});
					this.sectionTree.collection.fetch({
						attrs: { title: msg.title }
					});
				}.bind(this));
				this.sectionTree.on('select', function (msg) {
					if (msg.attributes) {
						return;
					}
					this.tagView.pushTag({
						name: msg.title, header: 'topic'
					});
				}.bind(this));
				this.post = params.post;
				this.onSubmitPost = params.onSubmitPost;
				this.onDiscardPost = params.onDiscardPost;
				// this.post.fetch();
			},
			render: function () {
				this.$el.html(
					template({
						post: this.post.toJSON()
					})
				);
				// initialize summernote WSIWYG editor plugin
				$('#summernote').summernote();
				// Render the tag input field
				this.tagView.$el = this.$el.find('#new-note-tags');
				this.tagView.render();
				// Render the selection trees
				this.classTree.$el = this.$el.find('#class-tree');
				this.sectionTree.$el = this.$el.find('#section-tree');
				this.classTree.render();
				this.sectionTree.render();
				this.delegateEvents();
			},
			submit: function(e) {
				this.post.save({
					title: this.$el.find('.note-title').val(),
					content: jsonEscape(this.$el.find('.note-content').val()),
					postedOn: Date.now(),
					upvotes: 50,
					tags: this.tagView.tags.data
				}, {
					success: this.onSubmitPost
				});
				console.log('after save', this.post.toJSON());
				e.preventDefault();
			},
			discard: function(e) {
				this.post.destroy({success: this.onDiscardPost});
				e.preventDefault();
			},
			jsonEscape: function (str)  {
				return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
			}
		});
	}
);
