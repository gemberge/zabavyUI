define(['jquery', 'underscore', 'backbone', 'moment', 'text!days/template.calendar.html', 'days/view.single.embedded.calendar', 'days/model.calendar.day'],
	function ($, _, Backbone, momentLib, CalendarTemplate, CalendarDayView, CalendarDayModel) {

	var ViewList = Backbone.View.extend({
		el: $('#main'),
		calendarTemplate: _.template(CalendarTemplate),
		startDay: null,
		initialize: function(params){
			this.startDay = params.startDay;
		},
		render: function() {
			var view = this;
			this.$el.html( this.calendarTemplate({	prevDate: view.startDay.clone().subtract(28, 'days').toISOString(),
													nextDate: view.startDay.clone().add(28, 'days').toISOString()}) );
			var days = this.generateCalendar();
			var n = 0, i = 0;
			var weekDivs = $('.week');
			var daysDiv = $(weekDivs[i]).find('.days');
			var eventsDiv = $(weekDivs[i]).find('.events');
			var dayView;
			_.each(days, function(day) {
				if(n == 7) {
					n = 0;
					i = i + 1;
					daysDiv = $(weekDivs[i]).find('.days');
					eventsDiv = $(weekDivs[i]).find('.events');
				}
				dayView = new CalendarDayView({model: day, eventsDiv: eventsDiv});
				daysDiv.append(dayView.render().el);
				n = n + 1;
			});
			$.ajax({
				url: '/api/days/count',
				type: 'GET',
				data: {'dateFrom': days[0].get("date").valueOf(), 'dateTo': days[27].get("date").valueOf()},
				success: function (data) {
					var i = 0;
					_.each(data, function (count) {
						for(; i < days.length; i++) {
							if(moment(count[0]).isSame(days[i].get("date"), 'day')) {
								days[i].set("count", count[1]);
								break;
							}
						}
					});

				}
			});
		},
		generateCalendar: function() {
			var days = [], day, currentDay = moment(), view = this;
			for(var i = 0; i < 28; i = i+1) {
				day = new CalendarDayModel({
					date: view.startDay.clone()
				});
				if(view.startDay.isSame(currentDay, 'day')) day.set("isCurrent", true);
				days.push(day);
				view.startDay.add(1, 'days');
			}
			return days;
		}
	});

	return ViewList;
});