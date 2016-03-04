var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/Users');

var config = require('../../config/config');

function validateEmail(email) {
  var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if (re.test(email)) {
    if ((email.indexOf('@columbia.edu', email.length - '@columbia.edu'.length) !== -1) || (email.indexOf('@barnard.edu', email.length - '@barnard.edu'.length) !== -1)) {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new GoogleStrategy({
			clientID: config.googleAuth.clientID,
			clientSecret: config.googleAuth.clientSecret,
			callbackURL: config.googleAuth.callbackURL
		},
		function(token, refreshToken, profile, done) {

			// User.findOne will not fire until data back
			// from google
			process.nextTick(function() {
				User.findOne({
					'googleID': profile.id
				}, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						// refresh token here
						user.token = token;

						user.save(function(err) {
							if (err)
								throw err;
							return done(null, user);
						});

					} else {
						if(profile.emails[0].value){
							var newUser = new User();

							newUser.googleID = profile.id;
							newUser.token = token;
							newUser.name = profile.displayName;
							newUser.email = profile.emails[0].value;

							// Save the User
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						}
					}
				});
			});
		}));
}