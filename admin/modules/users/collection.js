App.Collections.Users = Backbone.Collection.extend({
	url: '/api/users',
	model: App.Models.User
});