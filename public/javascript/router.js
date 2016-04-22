define('router',
	['jquery', 'underscore', 'backbone', 'views/NavbarView'],
	function ($, _, Backbone, NavbarView) {
		// Setup router and declare routes
		var AppRouter = Backbone.Router.extend({
			routes: { //routes translate to events
				'/signup': 'showSignUp',
				'/login': 'showLogin',
				'dashboard': 'showDashboard',
				'new': 'showNewPost',
				'section/:id': 'showSection',
				'post/:id': 'showPost',
				'search': 'showSearch',
				'search/:term': 'showSearch'
			}
		});

		//																					//
		// Initialize router												//
		//																					//
		var initialize = function () {
			var router = window.router ? window.router : new AppRouter();
			var defaultContentSizing = "col-xs-12 col-sm-8 col-sm-push-4 col-md-8 col-md-push-4 col-lg-9 col-lg-push-3";
			var fullWidthContentSizing = "col-xs-12 col-sm-12"

			//																					//
			// Initialize navigation bar								//
			//																					//
			window.navbar = new NavbarView({
				el: '#navbar'
			});

			//																					//
			// Define the routes, render the right view //
			//																					//

			//																					//
			// /#/dashboard															//
			//																					//
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
					var tree = new TreeView({
						collection: new ClassCollection(),
						el: '#tree'
					});
					tree.show();
					window.router.tree = tree;
					window.navbar.setTitle('dashboard');
					window.router.currentView = 'dashboard';
					window.router.content = dashboard;
				});
			});

			//																					//
			// /#/new																		//
			//																					//
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

			//																					//
			// /#/section/:id/													//
			//																					//
			router.on('route:showSection', function(sectionId) { //on event route:showSection, run this function (anonymous)
				//Load modules required for view
				require(['views/SectionView', 'views/TreeView', 'collections/ClassCollection', 'collections/SectionCollection', 'models/PostModel', 'models/SectionModel'],
					function (SectionView, TreeView, ClassCollection, SectionCollection, PostModel, SectionModel) { //May require more things!
						//Show tree and size content
						$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
						$('#tree').show();

						//Initialize page
						var section = new SectionView({
							//What do I want to show here, how do I show it and where do I get that data from?
							model: new SectionModel({_id: sectionId}),
							el: '#content'
						});
						var tree = window.navTree || new TreeView({
							collection: new ClassCollection(),
							el:'#tree' //displays el Element in views.templates.layout.jade
						});

					});

			});

			//																					//
			// /#/lecture/:id														//
			//																					//
			router.on('route:showLecture', function(lectureId) { //on event route:showSection, run this function (anonymous)
				require(['views/LectureView', 'views/TreeView', 'collections/ClassCollection', 'collections/SectionCollection', 'models/PostModel', 'models/LectureModel'],
					function (SectionView, TreeView, ClassCollection, SectionCollection, PostModel, SectionModel) { //May require more things!
						//Show tree and size content
						$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
						$('#tree').show();

						//Initialize page
						var section = new SectionView({
							//What do I want to show here, how do I show it and where do I get that data from?
							model: new SectionModel({_id: sectionId}),
							el: '#content'
						});
						var tree = window.navTree || new TreeView({
							collection: new ClassCollection(),
							el:'#tree' //displays el Element in views.templates.layout.jade
						});

						window.router.content = newPost;
						window.navbar.setTitle('new');
						window.router.currentView = 'new';
					});
			});

			//																					//
			// /#/post 																	//
			//																					//
			router.on('route:showPost', function (postId) {
				// Load modules required for view
				require(['views/PostView', 'models/PostModel'], function (PostView, PostModel) {
					// Hide tree and expand content
					$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
					$('#tree').show();

					var postView = new PostView({
						post: new PostModel({ _id: postId}),
						el: '#content'
					});
					window.router.content = postView;
					window.navbar.setTitle('post');
					window.router.currentView = 'post';
				});
			});

			//																					//
			// /#/search																//
			//																					//
			router.on('route:showSearch', function (term) {
					if (window.router.currentView === 'search' && term) {
						window.router.content.trigger('search', term);
					} else if (window.router.currentView !== 'search' && term) {
						require(['views/SearchView', 'collections/PostCollection',
							'collections/ClassCollection', 'collections/SectionCollection'],
							function(SearchView, PostCollection, ClassCollection, SectionCollection) {
								var searchView = new SearchView({
									posts: new PostCollection(),
									el: '#content'
								})
								if (term) searchView.trigger('search', term);
								window.router.currentView = 'search';
								window.router.content = searchView;
							}
						);
					}
			});

			// Save router as a global object
			window.router = router;
			window.router = _.extend(router, {content: {}, currentView: {}, tree: {} });
			// Start the record of history
			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
	}
)
