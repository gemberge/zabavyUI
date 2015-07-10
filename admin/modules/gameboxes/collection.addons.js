App.Collections.GameboxAddons = Backbone.Collection.extend({
	url: function () {
		return '/api/gameboxes/' + this.parentId + '/addons';
	},
	model: App.Models.Gamebox,
	initialize: function (props) {
		this.parentId = props.parentId;
	}
});