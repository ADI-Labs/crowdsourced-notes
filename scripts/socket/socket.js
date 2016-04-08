// sockets.js
var socketio = require('socket.io')
var User = require('../models/Users');
var Post = require('../models/Posts');
var Section = require('../models/Sections');
var Class = require('../models/Classes');

var fs = require('fs');
var path = require('path');

module.exports.listen = function(app) {
  io = socketio.listen(app)

  io.on('connection', function(socket) {
    console.log("A User Connected");

    socket.on('chat message', function(data) {
      console.log(data.user + ': ' + data.msg);
      io.emit('chat message', data.msg, data.user);
    });

    socket.on('upload_image', function(data, buffer) {

      function genKey() {
        function s4() {
          var temp = (Math.floor(Math.random() * 20));
          return temp;
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
      console.log(data.post.content);
      var extension = data.post.content.split(".")[1];
      var newPost = new Post();
      var imageID = genKey();
      var desiredPath = path.resolve('../lib/images/' + imageID);
      console.log(data.post.content);

      var fileName = path.resolve(__dirname, '../../lib/images/' + imageID + "." + extension);
      console.log(fileName);

      fs.open(fileName, 'a', 0755, function(err, fd) {
        if (err) throw err;

        fs.write(fd, buffer, null, 'Binary', function(err, written, buf) {
          fs.close(fd, function() {
            console.log("File saved successful!");
          })
        })
      })

      newPost.content = path.resolve(__dirname, '../../lib/images/' + imageID + '.png');
      console.log("Creating " + data.post.title);


      newPost.title = data.post.title;
      newPost.date = data.post.date;
      newPost.postedOn = new Date();
      newPost.upvotes = 0;
      newPost.comments = [];
      newPost.tags = data.post.tags;

      newPost.save(function(err) {
        if (err)
          throw err;
        socket.emit('createFin', newPost);
      });

      // Eventually Add Dynamic Creation of Sections
      // if (Section.findOne())

      var newSection = new Section();
      newSection.title = "Section";
      newSection.section_code = "052";
      newSection.professor = "Paul Blaer";
      newSection.lectures.push(newPost);

      newSection.save(function(err) {
        if (err) throw err;
        socket.emit('sectionFin', newSection);
      });

      var newClass = new Class();

      newClass.title = "Class";
      newClass.course_code = "W1004";
      newClass.semester = "Fall";
      newClass.sections.push(newSection);

      newClass.save(function(err) {
        if (err) throw err;
        socket.emit('classFin', newClass);
      });
    });

    socket.on('upload_text', function(data, buffer) {
      newPost.content = data.post.content;
      newPost.title = data.post.title;
      newPost.date = data.post.date;
      newPost.postedOn = new Date();
      newPost.upvotes = 0;
      newPost.comments = [];
      newPost.tags = data.post.tags;

      newPost.save(function(err) {
        if (err)
          throw err;
        socket.emit('createFin', newPost);
      });

      // Eventually Add Dynamic Creation of Sections
      // if (Section.findOne())

      var newSection = new Section();
      newSection.title = "Section";
      newSection.section_code = "052";
      newSection.professor = "Paul Blaer";
      newSection.lectures.push(newPost);

      newSection.save(function(err) {
        if (err) throw err;
        socket.emit('sectionFin', newSection);
      });

      var newClass = new Class();

      newClass.title = "Class";
      newClass.course_code = "W1004";
      newClass.semester = "Fall";
      newClass.sections.push(newSection);

      newClass.save(function(err) {
        if (err) throw err;
        socket.emit('classFin', newClass);
      });
  });

  return io;
}