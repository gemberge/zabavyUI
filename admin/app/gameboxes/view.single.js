define(['jquery', 'underscore', 'backbone', 'gameboxes/collection.addons', 'gameboxes/model', 'text!gameboxes/template.single.html'],
	function ($, _, Backbone, Addons, Model, Template) {

	var SingleView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		events: {
			'click .editBtn': 'editEntity',
			'click .delBtn'	: 'deleteEntity'
		},
		initialize: function(){
			$(this.el).off('click', '.editBtn');
			$(this.el).off('click', '.delBtn');
		},
		render: function() {
			if(this.model.get('parent') == null) {
				var gameboxView = this;
				var addons = new Addons({parentId: this.model.get('id')});
				addons.fetch({
					success: function (collection, data) {
						if(addons.length > 0) {
							gameboxView.$el.html( gameboxView.template({ model: gameboxView.model, addons: collection.models }) );
						} else {
							gameboxView.$el.html( gameboxView.template({ model: gameboxView.model, addons: null }) );
						}
					},
					error: function (model, response) {
						console.error(response);
					}
				});
			} else {
				this.$el.html( this.template({ model: this.model, addons: null }) );
			}
		},
		editEntity: function() {
			Backbone.history.navigate("gameboxes/" + this.model.get("id") + "/edit", {trigger: true});
		},
		deleteEntity: function() {
			this.model.destroy({
				success: function () {
					Backbone.history.navigate("gameboxes", {trigger: true});
				},
				error: function () {
					console.info('ERROR');
				}
			});
		}
	});

	return SingleView;
});