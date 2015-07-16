require.config({
	baseUrl: '/rsc/admin/app/',
	paths: {
		jquery			: '../assets/jquery/jquery-2.1.3.min',
		underscore		: '../assets/underscore/underscore-min',
		backbone		: '../assets/backbone/backbone-min',
		text			: '../assets/require/text',
		materialize		: '../assets/materialize/materialize.amd',
		moment			: '../assets/moment/moment.min',
		typeahead		: '../assets/typeahead/typeahead.jquery.min',
		bloodhound		: '../assets/typeahead/bloodhound.min',
		jsCookie		: '../assets/js.cookie/js.cookie'
	},
	shim: {
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		typeahead: {
			deps: ["jquery"]
		},
		bloodhound: {
			deps: ["jquery"],
			exports: "Bloodhound"
		}
	}
});

require(['jquery', 'app'], function ($, App) {
	$(document).ready(function() {
		App.initialize();
	});
});