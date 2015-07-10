define(['jquery', 'underscore', 'backbone',
		'days/collection', 'days/view.list', 'days/model', 'days/view.single', 'days/view.single.edit']
	, function (
		$, _, Backbone,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'days'			: 'days',
			'days/:id'		: 'days',
			'days/new'		: 'editDay',
			'days/:id/edit'	: 'editDay'
		},

		days: function(id) {
			if(id == null) {
				var days = new Collection();
				days.fetch({
					success: function() {
						var daysListView = new ListView();
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
					var day = new Model();
					day.set("id", id);
					day.fetch({
						success: function() {
							var dayView = new SingleView({model: day});
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
			var day = new Model();
			if(id != null) {
				day.set('id', id);
				day.fetch({async: false});
			}
			var dayView = new EditView({model: day});
			dayView.render();
		}

	});

	return  Router;
});