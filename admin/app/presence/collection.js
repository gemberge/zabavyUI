define(['jquery', 'underscore', 'backbone', 'presence/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/presence',
		model: Model
	});

	return Collection;
});