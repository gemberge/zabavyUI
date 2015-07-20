define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
		urlRoot: '/api/days',
		defaults: {
			date	: '',
			isCurrent: false,
			count	: null
		}
	});

	return Model;
});