define(['jquery', 'underscore', 'backbone', 'utils/routeFunc',
		'gameboxes/collection', 'gameboxes/view.list', 'gameboxes/model', 'gameboxes/view.single', 'gameboxes/view.single.edit']
	, function (
		$, _, Backbone, routeFunc,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'gameboxes'			: 'list',
			'gameboxes/:id'		: 'single',
			'gameboxes/new'		: 'singleEdit',
			'gameboxes/:id/edit': 'singleEdit'
		},

		list: function(paramsString) {
			var offset = 0, limit = 21;
			if(paramsString != null) {
				var params = routeFunc.parseRequestParam(paramsString);
				if(params.offset) offset = params.offset;
				if(params.limit) limit = params.limit;
			}
			var gameboxes = new Collection();
			gameboxes.fetch({
				data: {offset: offset, limit: limit},
				success: function() {
					var gameboxesListView = new ListView();
					gameboxesListView.render({collection: gameboxes});
				},
				error: function() {
					//TODO: show error
				}
			});
		},

		single: function(id) {
			if(id == 'new') {
				this.singleEdit(null);
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
		},

		singleEdit: function(id) {
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