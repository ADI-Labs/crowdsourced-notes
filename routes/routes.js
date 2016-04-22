module.exports = function(app, passport) {
		app.get('/', function(req, res) {
			// if (req.isAuthenticated()) {
				res.redirect('/#/dashboard');
			// } else {
				res.render('index', {
					title: "Hello World"
				})
			// }
		});

		app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
		});

		// Google Routes
		app.get('/auth/google', passport.authenticate('google', {
			scope: ['profile', 'email']
		}));

		// google callback
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect: '/#/dashboard',
				failureRedirect: '/'
			})
		);
	}