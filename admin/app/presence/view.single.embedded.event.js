define(['jquery', 'underscore', 'backbone', 'presence/view.single.edit', 'text!presence/template.single.embedded.event.html'],
	function ($, _, Backbone, SingleEditView, Template) {

	var View = Backbone.View.extend({
		tagName: 'div',
		className: 'super-list-item',
		template: _.template(Template),
		events: {
			'click .editView': 'showEditView',
			'click .goOut'	: 'goOut'
		},
		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.destroy, this);
			$(this.el).off('click', '.showEditView');
			$(this.el).off('click', '.goOut');
		},
		showEditView: function () {
			var presenceEditView = new SingleEditView({model: this.model});
			presenceEditView.render();
		},
		goOut: function () {
			var currentTime = moment().valueOf();
			if(currentTime > this.model.get('gamingDay').endTime) {
				this.model.set('timeTo', this.model.get('gamingDay').endTime);
			} else {
				this.model.set('timeTo', currentTime);
			}
			this.model.save(this.model.toJSON());
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		destroy: function() {
			$(this.el).remove();
		}
	});

	return View;
});