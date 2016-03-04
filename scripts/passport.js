var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./models/Users');

var config = require('./config');

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
			User.findOne({ 'google.id': profile.id}, function(err, user) {
				if (err)
					return done(err);
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.id = profile.id;
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
			});
		});
	}));
}