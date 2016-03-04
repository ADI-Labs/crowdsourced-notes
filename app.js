var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var config = require('./config/config');
var passport = require('passport');
//var session = require('express-session');
require('./scripts/passport')(passport);

var io = require('socket.io')(server);
mongoose = require('mongoose');

mongoose.connect(config.mongo.url);

server.listen(config.app.port);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public/static')));

//app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

require('./scripts/passport')(passport);
require('./routes/routes')(app, passport);

console.log("*****************************");
console.log("* App running at port: " + config.app.port + " *");
console.log("*****************************");

io.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});