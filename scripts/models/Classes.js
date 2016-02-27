var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
	title: String,
	course_code: String,
	semester: String,
	sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section'}]
});

mongoose.model('Class', ClassSchema);