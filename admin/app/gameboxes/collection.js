define(['jquery', 'underscore', 'backbone', 'gameboxes/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/gameboxes',
		model: Model
	});

	return Collection;
});