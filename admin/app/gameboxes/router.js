define(['jquery', 'underscore', 'backbone',
		'gameboxes/collection', 'gameboxes/view.list', 'gameboxes/model', 'gameboxes/view.single', 'gameboxes/view.single.edit']
	, function (
		$, _, Backbone,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'gameboxes'			: 'gameboxes',
			'gameboxes/:id'		: 'gameboxes',
			'gameboxes/new'		: 'editGamebox',
			'gameboxes/:id/edit': 'editGamebox'
		},

		gameboxes: function(id) {
			if(id == null) {
				var gameboxes = new Collection();
				gameboxes.fetch({
					success: function() {
						var gameboxesListView = new ListView();
						gameboxesListView.render({collection: gameboxes});
					},
					error: function() {
						//TODO: show error
					}
				});
			} else {
				if(id == 'new') {
					this.editGamebox(null);
				} else {
					var gamebox = new Model();
					gamebox.set("id", id);
					gamebox.fetch({
						success: function() {
							var gameboxView = new SingleView({model: gamebox});
							gameboxView.render();
						},
						error: function() {
							//TODO: show error
						}
					});
				}
			}
		},

		editGamebox: function(id) {
			var gamebox = new Model();
			if(id != null) {
				gamebox.set('id', id);
				gamebox.fetch({async: false});
			}
			var gameboxView = new EditView({model: gamebox});
			gameboxView.render();
		}

	});

	return  Router;
});