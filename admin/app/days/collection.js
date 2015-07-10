define(['jquery', 'underscore', 'backbone', 'days/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/days',
		model: Model
	});

	return Collection;
});