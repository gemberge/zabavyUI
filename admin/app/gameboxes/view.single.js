App.Views.Gamebox = Backbone.View.extend({
	el: $('#main'),
	template: _.template( $('#template-single-gameboxes').html() ),
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
			var addons = new App.Collections.GameboxAddons({parentId: this.model.get('id')});
			addons.fetch({
				success: function (collection, data) {
					if(addons.length > 0) {
						gameboxView.$el.html( gameboxView.template({ model: gameboxView.model, addons: addons.models }) );
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