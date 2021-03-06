define('router',
	['jquery',
	 'underscore',
	 'backbone',
	 'views/NavbarView',
	 'views/TreeView',
 	 'collections/ClassCollection'],
	function ($, _, Backbone, NavbarView, TreeView, ClassCollection) {
		// Setup router and declare routes
		var AppRouter = Backbone.Router.extend({
			routes: { //routes translate to events
				'/signup': 'showSignUp',
				'/login': 'showLogin',
				'dashboard': 'showDashboard',
				'new': 'showNewPost',
				'section/:id': 'showSection',
				'lecture/:id': 'showLecture',
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
			// Initialize navigation bar and tree				//
			//																					//
			window.navbar = new NavbarView({
				el: '#navbar'
			});
			window.tree = new TreeView({
				collection: new ClassCollection(),
				el: '#tree'
			});
			//																					//
			// Define the routes, render the right view //
			//																					//

			//																					//
			// /#/dashboard															//
			//																					//
			router.on('route:showDashboard', function () {
				// Load modules required for view
				require(['views/DashboardView', 'collections/UserCollection', 'collections/ClassCollection', 'collections/PostCollection'],
				  function (DashboardView, UserCollection, ClassCollection, PostCollection) {
					// Show tree and size content
					$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
					// $('#tree').show();

					// Initialize page
					var dashboard = new DashboardView({
						recentPosts: new PostCollection(),
						el: '#content'
					});
					window.tree.setCollection(new ClassCollection());
					window.tree.show();
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
				require(['views/NewPostView', 'collections/ClassCollection', 'collections/SectionCollection', 'models/PostModel'],
					function (NewPostView, ClassCollection, SectionCollection, PostModel) {
						// Hide tree and expand content
						$('#content').removeClass(defaultContentSizing).addClass(fullWidthContentSizing);
						window.tree.hide();

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

						//Initialize page
						var model = new SectionModel({_id: sectionId});
						model.fetch({
							success: function (m) {
								section = new SectionView({
									//What do I want to show here, how do I show it and where do I get that data from?
									model: m,
									el: '#content'
								});
								window.tree.collection = new SectionCollection(m);
								window.tree.render();
								window.tree.show();
							}
						});
					});
			});

			//																					//
			// /#/lecture/:id														//
			//																					//
			router.on('route:showLecture', function(lectureId) {
				require(['views/LectureView', 'views/TreeView', 'collections/PostCollection', 'models/LectureModel'],
					function (LectureView, TreeView, PostCollection, LectureModel) {
						// Show tree and size content
						$('#content').removeClass(fullWidthContentSizing).addClass(defaultContentSizing);
						$('#tree').show();

						// Initialize page
						var lecture = new LectureView({
							model: new LectureModel({_id: lectureId}),
							el: '#content'
						});
						// var tree = window.navTree || new TreeView({
						// 	collection: new ClassCollection(),
						// 	el:'#tree' //displays el Element in views.templates.layout.jade
						// });

						window.router.content = lecture;
						window.navbar.setTitle('lecture');
						window.router.currentView = 'lecture';
					});
			});

			//																					//
			// /#/post/:id															//
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
