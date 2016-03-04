var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var config = require('./config/config');
var passport = require('passport');

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var io = require('./scripts/socket/socket').listen(server);
mongoose = require('mongoose');
mongoose.connect(config.mongo.url);

server.listen(config.app.port);

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({ // prob should generate new key every time
    secret: 'cookiezcookiezcookiez',
    name: 'this_cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./scripts/authenticate/auth')(passport);
require('./routes/routes')(app, passport);

console.log("*****************************");
console.log("* App running at port: " + config.app.port + " *");
console.log("*****************************");
