define(['jquery', 'underscore', 'backbone', 'users/model'], function ($, _, Backbone, Model) {

	var Collection = Backbone.Collection.extend({
		url: '/api/users',
		model: Model
	});

	return Collection;
});