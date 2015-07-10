App.Collections.Scores = Backbone.Collection.extend({
	url: '/api/scores',
	model: App.Models.Score
});