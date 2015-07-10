define(['jquery', 'underscore', 'backbone', 'users/model', 'text!users/template.single.html'], function ($, _, Backbone, Model, Template) {

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
			this.$el.html( this.template({ model: this.model }) );
		},
		editEntity: function() {
			Backbone.history.navigate("users/" + this.model.get("id") + "/edit", {trigger: true});
		},
		deleteEntity: function() {
			this.model.destroy({
				success: function () {
					Backbone.history.navigate("users", {trigger: true});
				},
				error: function () {
					console.info('ERROR');
				}
			});
		}
	});

	return SingleView;
});