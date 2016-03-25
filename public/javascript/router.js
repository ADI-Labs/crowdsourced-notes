define('router',
	['jquery', 'underscore', 'backbone'],
	function ($, _, Backbone, DashboardView) {
		// Setup router and declare routes
		var AppRouter = Backbone.Router.extend({
			routes: {
				'/signup': 'showSignUp',
				'/login': 'showLogin',
				'dashboard': 'showDashboard',
				'new': 'showNewPost',
				'section/:id': 'showSection',
				'post/:id': 'showPost'
			}
		});

		// Initialize router
		var initialize = function () {
			var router = window.router ? window.router : new AppRouter();
			var defaultContentSizing = "col-xs-12 col-sm-9 col-sm-push-3 col-md-8 col-md-push-4 col-lg-9 col-lg-push-3";
			var fullWidthContentSizing = "col-xs-12 col-sm-12";

			console.log("Does this function ever run??? (Router.intialize())");
			// Define the routes, render the right view
			// appRouter.on('showSignUp', function () {});
			// appRouter.on('showLogin', function () {});

			router.on('route:showDashboard', function () {
				// Load modules required for view
				require(['views/DashboardView', 'collections/UserCollection', 'views/TreeView', 'collections/ClassCollection', 'collections/PostCollection'],
				  function (DashboardView, UserCollection, TreeView, ClassCollection, PostCollection) {
					// Show tree and size content
					$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
					$('#tree').show();

					// Initialize page
					var dashboard = new DashboardView({
						recentPosts: new PostCollection(),
						el: '#content'
					});
					var tree = window.navTree || new TreeView({
						collection: new ClassCollection(),
						el: '#tree'
					});
					tree.show();
					window.navTree = tree;
				});
			});

			router.on('route:showNewPost', function () {
				// Load modules required for view
				require(['views/NewPostView', 'views/TreeView', 'collections/ClassCollection', 'collections/SectionCollection', 'models/PostModel'],
					function (NewPostView, TreeView, ClassCollection, SectionCollection, PostModel) {
						// Hide tree and expand content
						$('#content').removeClass(defaultContentSizing).addClass(fullWidthContentSizing);
						$('#tree').hide();

						// Initialize page
						var newPost = new NewPostView({
							classes: new ClassCollection(),
							sections: new SectionCollection(),
							post: new PostModel(),
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
