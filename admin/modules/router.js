App.Router = Backbone.Router.extend({
	routes: {
		''				: 'index',
		'days'			: 'days',
		'days/:id'		: 'days',
		'days/new'		: 'editDay',
		'days/:id/edit'	: 'editDay',

		'users'			: 'users',
		'users/:id'		: 'users',
		'users/new'		: 'editUser',
		'users/:id/edit': 'editUser',

		'gameboxes'			: 'gameboxes',
		'gameboxes/:id'		: 'gameboxes',
		'gameboxes/new'		: 'editGamebox',
		'gameboxes/:id/edit': 'editGamebox'
	},

	index: function() {
		//$("#main").html("Index route has been called..");
	},

	days: function(id) {
		if(id == null) {
			var days = new App.Collections.Days();
			days.fetch({
				success: function() {
					var daysListView = new App.Views.DaysList();
					daysListView.render({collection: days});
				},
				error: function() {
					//TODO: show error
				}
			});
		} else {
			if(id == 'new') {
				this.editDay(null);
			} else {
				var day = new App.Models.Day();
				day.set("id", id);
				day.fetch({
					success: function() {
						var dayView = new App.Views.Day({model: day});
						dayView.render();
					},
					error: function() {
						//TODO: show error
					}
				});
			}
		}
	},

	editDay: function(id) {
		var day = new App.Models.Day();
		if(id != null) {
			day.set('id', id);
			day.fetch({async: false});
		}
		var dayView = new App.Views.DayEdit({model: day});
		dayView.render();
	},

	users: function(id) {
		if(id == null) {
			var users = new App.Collections.Users();
			users.fetch({
				success: function() {
					var usersListView = new App.Views.UsersList();
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
				var user = new App.Models.User();
				user.set("id", id);
				user.fetch({
					success: function() {
						var userView = new App.Views.User({model: user});
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
		var user = new App.Models.User();
		if(id != null) {
			user.set('id', id);
			user.fetch({async: false});
		}
		var userView = new App.Views.UserEdit({model: user});
		userView.render();
	},

	gameboxes: function(id) {
		if(id == null) {
			var gameboxes = new App.Collections.Gameboxes();
			gameboxes.fetch({
				success: function() {
					var gameboxesListView = new App.Views.GameboxesList();
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
				var gamebox = new App.Models.Gamebox();
				gamebox.set("id", id);
				gamebox.fetch({
					success: function() {
						var gameboxView = new App.Views.Gamebox({model: gamebox});
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
		var gamebox = new App.Models.Gamebox();
		if(id != null) {
			gamebox.set('id', id);
			gamebox.fetch({async: false});
		}
		var gameboxView = new App.Views.GameboxEdit({model: gamebox});
		gameboxView.render();
	}

});