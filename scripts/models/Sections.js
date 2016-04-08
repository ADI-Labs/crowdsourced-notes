var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
  title: String,
  section_code: String,
  professor: String,
  // CHANGING THIS RIGHT NOW TO REF: 'POST' from REF: 'LECTURE'
  // FOR TESTING PURPOSES
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

module.exports = mongoose.model('Section', SectionSchema);