define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	var ListView = Backbone.View.extend({
		el: $('#main'),
		template: _.template( $('#template-list-gameboxes').html() ),
		render: function(data) {
			this.$el.html( this.template(data) );
		}
	});

	return ListView;
});