define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
		urlRoot: '/api/days',
		defaults: {
			title		: '',
			description	: '',
			startTime	: '',
			endTime		: ''
		}
	});

	return Model;
});