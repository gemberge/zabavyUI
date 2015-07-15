define(['jquery', 'underscore', 'backbone', 'utils/routeFunc',
		'days/collection', 'days/view.list', 'days/model', 'days/view.single', 'days/view.single.edit']
	, function (
		$, _, Backbone, routeFunc,
		Collection, ListView, Model, SingleView, EditView) {

	var Router = Backbone.Router.extend({
		routes: {
			'days'			: 'list',
			'days/:id'		: 'single',
			'days/new'		: 'singleEdit',
			'days/:id/edit'	: 'singleEdit'
		},

		list: function(paramsString) {
			var offset = 0, limit = 21;
			if(paramsString != null) {
				var params = routeFunc.parseRequestParam(paramsString);
				if(params.offset) offset = params.offset;
				if(params.limit) limit = params.limit;
			}
			var days = new Collection();
			days.fetch({
				data: {offset: offset, limit: limit},
				success: function() {
					var daysListView = new ListView({offset: offset, limit: limit});
					daysListView.render({collection: days});
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