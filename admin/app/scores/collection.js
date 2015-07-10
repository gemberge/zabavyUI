define(['jquery', 'underscore', 'backbone', 'scores/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/scores',
		model: Model
	});

	return Collection;
});