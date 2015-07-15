define(['jquery', 'underscore', 'backbone',
		'users/collection', 'users/view.list', 'users/model', 'users/view.single', 'users/view.single.edit']
	, function (
		$, _, Backbone,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'users'			: 'list',
			'users/:id'		: 'single',
			'users/new'		: 'singleEdit',
			'users/:id/edit': 'singleEdit'
		},

		users: function(paramsString) {
			var users = new Collection();
			users.fetch({
				success: function() {
					var usersListView = new ListView();
					usersListView.render({collection: users});
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
				var user = new Model();
				user.set("id", id);
				user.fetch({
					success: function() {
						var userView = new SingleView({model: user});
						userView.render();
					},
					error: function() {
						//TODO: show error
					}
				});
			}
		},

		singleEdit: function(id) {
			var user = new Model();
			if(id != null) {
				user.set('id', id);
				user.fetch({async: false});
			}
			var userView = new EditView({model: user});
			userView.render();
		}

	});

	return  Router;
});