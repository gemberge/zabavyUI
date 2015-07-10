App.Collections.Days = Backbone.Collection.extend({
	url: '/api/days',
	model: App.Models.Day
});