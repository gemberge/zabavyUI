define(['jquery', 'underscore', 'backbone', 'matches/view.single.edit', 'scores/collection', 'text!matches/template.single.embedded.event.html'],
	function ($, _, Backbone, SingleEditView, ScoresCollection, Template) {

	var View = Backbone.View.extend({
		tagName: 'div',
		className: 'super-list-item clickable editView',
		template: _.template(Template),
		events: {
			'click': 'showEditView'
		},
		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.destroy, this);
			$(this.el).off('click', '');
		},
		showEditView: function () {
			var matchEditView = new SingleEditView({model: this.model});
			matchEditView.render({scores: this.scores.clone()});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.loadPlayersAvatars();
			return this;
		},
		loadPlayersAvatars: function () {
			var view = this;
			view.scores = new ScoresCollection();
			view.scores.fetch({
				data: {matchId: view.model.get('id'), offset: 0, limit: 3000},
				success: function (collection, data, options) {
					var container = view.$el.find('.players');
					var element;
					container.html("");
					view.scores.each(function (score) {
						element = '<img src="' + score.get('user').photoUrl + '" class="circle">';
						container.append(element);
					});
				},
				error: function (model, response, options) {
					console.error(response);
				}
			})
		},
		destroy: function() {
			$(this.el).remove();
		}
	});

	return View;
});