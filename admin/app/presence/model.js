App.Models.Presence = Backbone.Model.extend({
	urlRoot: '/api/presence',
	defaults: {
		user		: null,
		gamingDay	: null,
		timeFrom	: 0,
		timeTo		: 0
	}
});