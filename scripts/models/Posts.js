var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date,
	postedOn: Date,
	// Need to change the Following Three as
	// we continue to build
	upvotes: Number,
	comments: String,
	tags: Array
});

mongoose.model('Post', PostSchema);