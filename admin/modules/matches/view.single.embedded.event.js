App.Views.MatchEmbeddedInEvent = Backbone.View.extend({
	tagName: 'div',
	className: 'super-list-item clickable editView',
	template: _.template( $('#template-single-embedded-event-match').html() ),
	events: {
		'click': 'showEditView'
	},
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.destroy, this);
		$(this.el).off('click', '');
	},
	showEditView: function () {
		var matchEditView = new App.Views.MatchEdit({model: this.model});
		matchEditView.render({scores: this.scores.clone()});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.loadPlayersAvatars();
		return this;
	},
	loadPlayersAvatars: function () {
		var view = this;
		view.scores = new App.Collections.Scores();
		view.scores.fetch({
			data: {matchId: view.model.get('id')},
			success: function (collection, data, options) {
				var container = view.$el.find('.players');
				var element;
				container.html("");
				view.scores.each(function (score) {
					element = '<img src="' + score.get('user').photoUrl + '" class="img-circle">';
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