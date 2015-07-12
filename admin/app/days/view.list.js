define(['jquery', 'underscore', 'backbone', 'moment', 'text!days/template.list.html', 'text!days/template.cards.html'],
	function ($, _, Backbone, momentLib, ListTemplate, CardsTemplate) {

	var ViewList = Backbone.View.extend({
		el: $('#main'),
		listTemplate: _.template(ListTemplate),
		cardsTemplate: _.template(CardsTemplate),
		events: {
			'click .cardsViewBtn'	: 'switchToCardsMode',
			'click .listViewBtn'	: 'switchToListMode'
		},
		initialize: function(){
			$(this.el).off('click', '.cardsViewBtn');
			$(this.el).off('click', '.listViewBtn');
		},
		render: function(data) {
			this.data = data;
			this.$el.html( this.listTemplate(this.data) );
		},
		switchToCardsMode: function () {
			this.$el.html( this.cardsTemplate(this.data) );
		},
		switchToListMode: function () {
			this.$el.html( this.listTemplate(this.data) );
		}
	});

	return ViewList;
});