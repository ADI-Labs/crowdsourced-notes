// Require.js allows us to configure shortcut alias

require.config({
	paths: {
		jquery: 'lib/jquery/jquery.min',
		underscore: 'lib/underscore/underscore.min',
		backbone: 'lib/backbone/backbone',
		mustache: 'lib/mustache/mustache',
		text: 'lib/text/text',
		stache: 'lib/stache/stache'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['app'], function (App) {
	App.initialize();
});
