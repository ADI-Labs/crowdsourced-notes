define('router',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone, DashboardView) {
		// Setup router and declare routes
		var AppRouter = Backbone.Router.extend({
			routes: {
				'/signup': 'showSignUp',
				'/login': 'showLogin',
				'dashboard': 'showDashboard',
				'/section/:id': 'showSection',
				'/post/:id': 'showPost'
			}
		});

		// Initialize router
		var initialize = function () {
			var appRouter = new AppRouter();
			console.log("Does this function ever run??? (Router.intialize())");
			// Define the routes, render the right view
			// appRouter.on('showSignUp', function () {});
			// appRouter.on('showLogin', function () {});
			appRouter.on('route:showDashboard', function () {
				console.log("Does this function ever run??? (appRouter.on(dashboard))");
				require(['views/DashboardView', 'collections/UserCollection'], function (DashboardView, UserCollection) {
					var dashboard = new DashboardView({
						collection: new UserCollection(),
						el: '#content'
					});
				});
			});
			// appRouter.on('showSection', function (sectionId) {});
			// appRouter.on('showPost', function (postId) {});

			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
	}
);
