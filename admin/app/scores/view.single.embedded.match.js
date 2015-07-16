define(['jquery', 'underscore', 'backbone', 'text!scores/template.single.embedded.match.html'], function ($, _, Backbone, Template) {

	var View = Backbone.View.extend({
		tagName: 'li',
		className: 'collection-item',
		template: _.template(Template),
		events: {
			'click .delScoreBtn': 'deleteScore',
			'change input[name="points"]': 'pointsChanged',
			'change input[name="win"]': 'winChanged'
		},
		initialize: function(data){
			this.scores = data.scores;
			$(this.el).off('click', '.delScoreBtn');
			$(this.el).off('change', 'input[name="points"]');
			$(this.el).off('change', 'input[name="win"]');
		},
		pointsChanged: function (e) {
			this.model.set("points", e.target.value);
		},
		winChanged: function (e) {
			this.model.set("win", e.target.checked);
		},
		deleteScore: function () {
			if(this.model.isNew()) {
				this.model.destroy();
			} else {
				this.scores.remove(this.model);
			}
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return View;
});