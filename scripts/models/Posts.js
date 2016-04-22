var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date,
	postedOn: Date,
	upvotes: Number,
	comments: Array, // let's make a comment object
	tags: Array // maybe tag object too
});

module.exports = mongoose.model('Post', PostSchema);
