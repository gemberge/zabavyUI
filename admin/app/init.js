require.config({
	baseUrl: '/rsc/admin/app/',
	paths: {
		jquery			: '../assets/jquery/jquery-2.1.3.min',
		underscore		: '../assets/underscore/underscore-min',
		backbone		: '../assets/backbone/backbone-min',
		text			: '../assets/require/text',
		bootstrap		: '../assets/bootstrap/js/bootstrap.min',
		datetimepicker	: '../assets/bootstrap-datetimepicker/bootstrap-datetimepicker.min',
		toggle			: '../assets/bootstrap-toggle/bootstrap-toggle.min',
		moment			: '../assets/moment/moment.min',
		typeahead		: '../assets/typeahead/typeahead.jquery.min',
		bloodhound		: '../assets/typeahead/bloodhound.min',
		jsCookie		: '../assets/js.cookie/js.cookie'
	},
	shim: {
		bootstrap: {
			deps: ["jquery"]
		},
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