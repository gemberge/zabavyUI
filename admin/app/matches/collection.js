App.Collections.Matches = Backbone.Collection.extend({
	url: '/api/matches',
	model: App.Models.Match
});