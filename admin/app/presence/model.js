define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
		urlRoot: '/api/presence',
		defaults: {
			user		: null,
			gamingDay	: null,
			timeFrom	: 0,
			timeTo		: 0
		}
	});

	return Model;
});