define(['jquery', 'underscore', 'backbone', 'text!gameboxes/template.list.html'], function ($, _, Backbone, Template) {

	var ListView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		render: function(data) {
			this.$el.html( this.template(data) );
		}
	});

	return ListView;
});