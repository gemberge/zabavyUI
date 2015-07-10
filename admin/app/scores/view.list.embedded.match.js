define(['jquery', 'underscore', 'backbone', 'scores/view.single.embedded.match'], function ($, _, Backbone, ScoreEmbeddedInMatchView) {

	var View = Backbone.View.extend({
		tagName: 'ul',
		className: 'list-group',
		initialize: function(data) {
			_(this).bindAll('add', 'remove');
			this._scoreViews = [];
			this._scoreToRemove = data.scoresToRemove;
			this.collection.each(this.add);
			this.collection.bind('add', this.add);
			this.collection.bind('remove', this.remove);
		},
		render: function() {
			this._rendered = true;
			var view = this;
			_(this._scoreViews).each(function(sv) {
				view.$el.append(sv.render().el);
			});
			return this;
		},
		add: function(score) {
			var scoreView = new ScoreEmbeddedInMatchView({model: score, scores: this.collection});
			this._scoreViews.push(scoreView);
			if (this._rendered) {
				this.$el.append(scoreView.render().el);
			}
		},
		remove: function(score) {
			if(!score.isNew()) this._scoreToRemove.push(score);

			var viewToRemove = _(this._scoreViews).select(function(cv) { return cv.model === score; })[0];
			this._scoreViews = _(this._scoreViews).without(viewToRemove);

			if (this._rendered) $(viewToRemove.el).remove();
		}
	});

	return View;
});