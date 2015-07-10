App.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	defaults: {
		nickname	: '',
		firstName	: '',
		lastName	: '',
		photoUrl	: '/rsc/admin/img/user-default.png',
		level		: 0,
		role		: ''
	}
});