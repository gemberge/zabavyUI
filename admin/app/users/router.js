define(['jquery', 'underscore', 'backbone',
		'users/collection', 'users/view.list', 'users/model', 'users/view.single', 'users/view.single.edit']
	, function (
		$, _, Backbone,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'users'			: 'users',
			'users/:id'		: 'users',
			'users/new'		: 'editUser',
			'users/:id/edit': 'editUser'
		},

		users: function(id) {
			if(id == null) {
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
			} else {
				if(id == 'new') {
					this.editUser(null);
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
			}
		},

		editUser: function(id) {
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