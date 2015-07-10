App.Models.Match = Backbone.Model.extend({
	urlRoot: '/api/matches',
	defaults: {
		tutorial	: true,
		winType		: "POINTS",
		event		: null,
		mainGamebox	: null,
		additionalGameboxes: []
	}
});