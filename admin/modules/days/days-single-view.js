App.Views.Day = Backbone.View.extend({
	el: $('#main'),
	template: _.template( $('#days-single-template').html() ),
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
		var presence = new App.Models.Presence({gamingDay: this.model.toJSON(), timeFrom: this.model.get("startTime")});
		var presenceEditView = new App.Views.PresenceEdit({model: presence});
		presenceEditView.render();
	},
	presenceList: function() {
		var dayView = this;
		$('#content').html('<div class="super-list" style="margin: -15px;"></div>');
		var presenceList = new App.Collections.Presence();
		presenceList.fetch({
			data: {dayId: dayView.model.get('id')},
			success: function() {
				_.each(presenceList.models, function(presence) {
					var presenceView = new App.Views.PresenceEmbeddedInEvent({model: presence});
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
		var match = new App.Models.Match({event: this.model.toJSON()});
		var matchEditView = new App.Views.MatchEdit({model: match});
		matchEditView.render({scores: new App.Collections.Scores()});
	},
	matchList: function() {
		var dayView = this;
		$('#content').html('<div class="super-list" style="margin: -15px;"></div>');
		var matchList = new App.Collections.Matches();
		matchList.fetch({
			data: {eventId: dayView.model.get('id')},
			success: function() {
				_.each(matchList.models, function(match) {
					var matchView = new App.Views.MatchEmbeddedInEvent({model: match});
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