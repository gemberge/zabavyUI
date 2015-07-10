define(['jquery', 'underscore', 'backbone', 'gameboxes/router', 'users/router', 'days/router'],
	function ($, _, Backbone, GameboxesRouter, UsersRouter, DaysRouter) {

	var initialize = function () {
		new UsersRouter();
		new GameboxesRouter();
		new DaysRouter();
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});