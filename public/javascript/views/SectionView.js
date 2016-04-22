define(['jquery',
	'underscore',
	'backbone',
	'models/LectureModel',
	'stache!/templates/section'],
	function ($, _, Backbone, LectureModel, template) {
		return Backbone.View.extend({
			initialize: function () {
				this.listenTo(this.model, 'sync change', this.mostRecent);
				this.model.fetch();
			},
			render: function () {
				this.$el.html(template({
					users: this.model.toJSON(),
					section: this.model.toJSON(),
					mostRecentLecture: this.mostRecentLecture.toJSON()
				}));
			},
			mostRecent: function () {
				var recentLecture;
				_.each(this.model.attributes.lectures, function (lecture, i) {
					recentLecture = i == 0 ? lecture : recentLecture;
					if (new Date(lecture.date) > new Date(recentLecture.date)) {
						recentLecture = lecture;
					} 
				});
				this.mostRecentLecture = new LectureModel({
					_id: recentLecture._id
				});
				this.mostRecentLecture.fetch({
					success:this.render.bind(this)
				});
			}
		});
	}
);
