define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
		urlRoot: '/api/scores',
		defaults: {
			win		: false,
			points	: 0,
			user	: null,
			match	: null
		}
	});

	return Model;
});