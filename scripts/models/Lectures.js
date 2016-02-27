var mongoose = require('mongoose');

var LectureSchema = new mongoose.Schema({
	title: String,
	professor: String,
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Lecture', LectureSchema);