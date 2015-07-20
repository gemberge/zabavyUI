define(['jquery', 'underscore', 'backbone', 'moment', 'days/model.calendar.day', 'text!days/template.single.embedded.calendar.html',
		'days/collection', 'text!days/template.single.embedded.list.html'],
	function ($, _, Backbone, momentLib, Model, Template, EventsCollection, EventTemplate) {

	var SingleView = Backbone.View.extend({
		tagName: 'div',
		className: 'day',
		template: _.template(Template),
		eventTemplate: _.template(EventTemplate),
		events: {
			'click ': 'activateDay'
		},
		initialize: function(data){
			this.model = data.model;
			this.eventsDiv = data.eventsDiv;
			this.eventsCollection = new EventsCollection();
			this.model.on('change', this.render, this);
			$(this.el).off('click', '');
		},
		render: function() {
			this.$el.html( this.template({ model: this.model }) );
			if(this.model.get('count')) {
				this.$el.addClass("clickable")
			} else {
				this.$el.removeClass("clickable")
			}
			if(this.model.get('isCurrent')) {
				this.$el.addClass("current")
			}
			return this;
		},
		activateDay: function() {
			if(!this.$el.hasClass("active")) {
				$(".day.active").removeClass("active");
				$(".week .events").html("");
				if(this.model.get("count")) {
					this.$el.addClass("active");
					this.eventsDiv.html("<img src='/rsc/admin/img/preloader.transparent.gif'/>");
					this.showEvents();
				}
			}
		},
		showEvents: function() {
			var view = this;
			var dateFrom = this.model.get("date").valueOf();
			var dateTo = this.model.get("date").clone().add(1, "days").valueOf();
			this.eventsCollection.fetch({
				data: {dateFrom: dateFrom, dateTo: dateTo},
				success: function (collection, data, options) {
					view.eventsDiv.html("");
					collection.each(function (event) {
						view.eventsDiv.append(view.eventTemplate({model: event}));
					});
				}
			})
		}
	});

	return SingleView;
});