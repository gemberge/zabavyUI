App.Models.Score = Backbone.Model.extend({
	urlRoot: '/api/scores',
	defaults: {
		win		: false,
		points	: 0,
		user	: null,
		match	: null
	}
});