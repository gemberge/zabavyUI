App.Views.DaysList = Backbone.View.extend({
	el: $('#main'),
	template: _.template( $('#days-list-template').html() ),
	render: function(data) {
		this.$el.html( this.template(data) );
	}
});