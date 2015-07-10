define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var Model = Backbone.Model.extend({
		urlRoot: '/api/matches',
		defaults: {
			tutorial	: true,
			winType		: "POINTS",
			event		: null,
			mainGamebox	: null,
			additionalGameboxes: []
		}
	});

	return Model;
});