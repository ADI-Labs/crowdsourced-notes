// Require.js allows us to configure shortcut alias

require.config({
	paths: {
		'jquery': 'lib/jquery/jquery.min',
		'underscore': 'lib/underscore/underscore.min',
		'backbone': 'lib/backbone/backbone',
		'backbone-collection-search': 'lib/backbone-collection-search/backbone-collection-search',
		'mustache': 'lib/mustache/mustache',
		'text': 'lib/text/text',
		'stache': 'lib/stache/stache',
		'bootstrap': 'lib/bootstrap/bootstrap',
		'moment': 'lib/momentjs/moment.min'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'backbone-collection-search': {
			deps: ['underscore', 'backbone'],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery']
		}
	},
	config: {
		'moment': {
			noGlobal: true
		}
	}
});

require(['app', 'underscore'], function (App) {
	App.initialize();
	if (loggedin) {
		document.location.hash = '#/dashboard';
	}
});
