define(['jquery', 'underscore', 'backbone', 'text!users/template.list.html'], function ($, _, Backbone, Template) {

	var ViewList = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		render: function(data) {
			this.$el.html( this.template(data) );
		}
	});

	return ViewList;
});