App.Models.Day = Backbone.Model.extend({
	urlRoot: '/api/days',
	defaults: {
		title		: '',
		description	: '',
		startTime	: '',
		endTime		: ''
	}
});