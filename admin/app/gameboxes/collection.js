App.Collections.Gameboxes = Backbone.Collection.extend({
	url: '/api/gameboxes',
	model: App.Models.Gamebox
});