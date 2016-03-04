// Require.js allows us to configure shortcut alias

require.config({
	paths: {
		jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone'
	}
});

require(['app'], function (App) {
	App.intialize();
});
