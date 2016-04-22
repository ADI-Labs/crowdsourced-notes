var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date,
	postedOn: Date,
	// Need to change the Following Three as
	// we continue to build
	upvotes: Number,
	comments: Array,
	tags: Array
});

module.exports = mongoose.model('Post', PostSchema);