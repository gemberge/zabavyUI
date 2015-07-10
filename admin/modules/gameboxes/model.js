App.Models.Gamebox = Backbone.Model.extend({
	urlRoot: '/api/gameboxes',
	defaults: {
		ukTitle		: "",
		enTitle		: "",
		description	: "",
		mink		: 2,
		maxk		: 6,
		minTime		: 30,
		maxTime		: 120,
		parent		: null,
		cover		: null
	}
});