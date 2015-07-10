define(['jquery', 'underscore', 'backbone', 'matches/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/matches',
		model: Model
	});

	return Collection;
});