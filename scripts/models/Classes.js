var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
	title: String,
	course_code: String,
	semester: String,
	sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section'}]
});

module.exports = mongoose.model('Class', ClassSchema);