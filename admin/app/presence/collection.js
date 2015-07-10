App.Collections.Presence = Backbone.Collection.extend({
	url: '/api/presence',
	model: App.Models.Presence
});