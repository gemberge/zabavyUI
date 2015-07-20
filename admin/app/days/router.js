define(['jquery', 'underscore', 'backbone', 'utils/routeFunc', 'moment', 'days/view.list', 'days/model', 'days/view.single', 'days/view.single.edit'],
	function ( $, _, Backbone, routeFunc, momentLib, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'days'			: 'list',
			'days/:id'		: 'single',
			'days/:id/edit'	: 'singleEdit'
		},

		list: function(paramsString) {
			var startDay = null;
			if(paramsString != null) {
				var params = routeFunc.parseRequestParam(paramsString);
				if(params.startDay) startDay = moment(params.startDay);
			}
			if(startDay == null) {
				startDay = moment();
				startDay.subtract(7, 'days');
				startDay.hour(0);
				startDay.minute(0);
				startDay.second(0);
			}
			if(startDay.day() != 1) {
				if(startDay.day() == 0) {
					startDay = startDay.subtract(6, 'days');
				} else {
					startDay = startDay.subtract(startDay.day() - 1, 'days');
				}
			}
			var daysListView = new ListView({startDay: startDay});
			daysListView.render();
		},

		single: function(id) {
			if(id == 'new') {
				this.singleEdit(null);
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
		},

		singleEdit: function(id) {
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