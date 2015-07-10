define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
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

	return Model;
});