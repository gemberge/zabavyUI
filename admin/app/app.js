define(['jquery', 'underscore', 'backbone', 'jsCookie', 'gameboxes/router', 'users/router', 'days/router'],
	function ($, _, Backbone, Cookies, GameboxesRouter, UsersRouter, DaysRouter) {

	var initialize = function () {
		new UsersRouter();
		new GameboxesRouter();
		new DaysRouter();
		Backbone.history.start();
		setUpSideStyles(null);
		$(".changeSideBtn").click(function (e) {
			changeSide();
		});
	};

	var changeSide = function() {
		var currentSide = Cookies.get("side");
		if(currentSide == "dark") {
			setUpSideStyles("light");
		} else {
			setUpSideStyles("dark");
		}
	};

	var setUpSideStyles = function(side) {
		if(side == null) side = Cookies.get("side");
		if(side == null) side = "light";
		if(side == "light") {
			Cookies.set("side", "light");
			$("#darkStyles").attr("disabled", "disabled");
		} else {
			Cookies.set("side", "dark");
			$("#darkStyles").removeAttr("disabled");
		}
	};

	return {
		initialize: initialize
	};
});