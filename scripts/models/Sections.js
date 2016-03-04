var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
	title: String,
	section_code: String,
	professor: String,
	lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}]
});

module.exports = mongoose.model('Section', SectionSchema);