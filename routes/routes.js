module.exports = function(app, passport) {
	app.get('/', function(req, res){
		if (req.isAuthenticated()) {
			res.render('layout', {
				title: "hello world",
				authorized: true
			})
		} else {
			res.render('index', {
				title: "hello world",
				authorized: false
			});
		}
	});

	app.get('/login', function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/dashboard');
		} else {
			res.render('index', {
				title: "hello world",
				authorized: false
			})
		}
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Google Routes
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		})
	);
}