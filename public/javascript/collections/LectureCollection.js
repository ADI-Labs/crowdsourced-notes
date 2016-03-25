define(
	'collections/Lecture',
	['jquery', 'underscore', 'backbone', 'models/Lecture'],
	function ($, _, Backbone, LectureModel) {
		return Backbone.model.extend({
			name: 'lectures',
			model: LectureModel
		});
	}
);
