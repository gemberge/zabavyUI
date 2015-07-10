App.Views.UsersList = Backbone.View.extend({
	el: $('#main'),
	template: _.template( $('#template-list-users').html() ),
	render: function(data) {
		this.$el.html( this.template(data) );
	}
});