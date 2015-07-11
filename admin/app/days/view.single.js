define(['jquery', 'underscore', 'backbone', 'moment', 'text!days/template.single.html',
		'presence/model', 'presence/collection', 'presence/view.single.embedded.event', 'presence/view.single.edit',
		'matches/model', 'matches/collection', 'matches/view.single.embedded.event', 'matches/view.single.edit', 'scores/collection'],
	function ($, _, Backbone, momentLib, Template,
		PresenceModel, PresenceCollection, PresenceEmbeddedInEventView, PresenceEditView,
		MatchModel, MatchesCollection, MatchEmbeddedInEventView, MatchEditView, ScoresCollection) {

	var SingleView = Backbone.View.extend({
		el: $('#main'),
		template: _.template(Template),
		events: {
			'click .editBtn'	: 'editEntity',
			'click .delBtn'		: 'deleteEntity',
			'click .presenceNew': 'presenceNew',
			'click .presenceList': 'presenceList',
			'click .matchNew'	: 'matchNew',
			'click .matchList'	: 'matchList'
		},
		initialize: function(){
			$(this.el).off('click', '.editBtn');
			$(this.el).off('click', '.delBtn');
			$(this.el).off('click', '.presenceNew');
			$(this.el).off('click', '.presenceList');
			$(this.el).off('click', '.matchNew');
			$(this.el).off('click', '.matchList');
		},
		render: function() {
			this.$el.html( this.template({ model: this.model }) );
		},
		editEntity: function() {
			Backbone.history.navigate("days/" + this.model.get("id") + "/edit", {trigger: true});
		},
		deleteEntity: function() {
			this.model.destroy({
				success: function () {
					Backbone.history.navigate("days", {trigger: true});
				},
				error: function () {
					console.info('ERROR');
				}
			});
		},
		presenceNew: function() {
			var presence = new PresenceModel({gamingDay: this.model.toJSON(), timeFrom: this.model.get("startTime")});
			var presenceEditView = new PresenceEditView({model: presence});
			presenceEditView.render();
		},
		presenceList: function() {
			var dayView = this;
			$('#content').html('<div class="super-list"></div>');
			var presenceList = new PresenceCollection();
			presenceList.fetch({
				data: {dayId: dayView.model.get('id')},
				success: function() {
					_.each(presenceList.models, function(presence) {
						var presenceView = new PresenceEmbeddedInEventView({model: presence});
						$('#content > .super-list').append(presenceView.render().el);
					});
				},
				error: function (a, b, c) {
					console.error(a);
					console.error(b);
					console.error(c);
				}
			})
		},
		matchNew: function() {
			var match = new MatchModel({event: this.model.toJSON()});
			var matchEditView = new MatchEditView({model: match});
			matchEditView.render({scores: new ScoresCollection()});
		},
		matchList: function() {
			var dayView = this;
			$('#content').html('<div class="super-list"></div>');
			var matchList = new MatchesCollection();
			matchList.fetch({
				data: {eventId: dayView.model.get('id')},
				success: function() {
					_.each(matchList.models, function(match) {
						var matchView = new MatchEmbeddedInEventView({model: match});
						$('#content > .super-list').append(matchView.render().el);
					});
				},
				error: function (a, b, c) {
					console.error(a);
					console.error(b);
					console.error(c);
				}
			})
		}
	});

	return SingleView;
});