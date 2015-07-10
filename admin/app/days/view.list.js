define(['jquery', 'underscore', 'backbone', 'moment', 'text!days/template.list.html'], function ($, _, Backbone, momentLib, Template) {

	var ViewList = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		render: function(data) {
			this.$el.html( this.template(data) );
		}
	});

	return ViewList;
});