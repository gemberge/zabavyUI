define(['jquery', 'underscore', 'backbone', 'gameboxes/model'], function ($, _, Backbone, Model) {

	var Addons = Backbone.Collection.extend({
		url: function () {
			return '/api/gameboxes/' + this.parentId + '/addons';
		},
		model: Model,
		initialize: function (props) {
			this.parentId = props.parentId;
		}
	});

	return Addons;
});