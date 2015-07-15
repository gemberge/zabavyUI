define(['jquery', 'underscore', 'backbone', 'text!users/template.list.html', 'text!users/template.cards.html',
		'text!users/template.single.embedded.list.html', 'text!users/template.single.embedded.cards.html'],
	function ($, _, Backbone, ListTemplate, CardsTemplate, ItemTemplate, CardTemplate) {

	var ViewList = Backbone.View.extend({
		el: $('#main'),
		listTemplate: _.template(ListTemplate),
		cardsTemplate: _.template(CardsTemplate),
		itemTemplate: _.template(ItemTemplate),
		cardTemplate: _.template(CardTemplate),
		events: {
			'click .cardsViewBtn'	: 'switchToCardsMode',
			'click .listViewBtn'	: 'switchToListMode',
			'click #nextPackBtn'	: 'loadNextPack'
		},
		initialize: function(params){
			this.offset = parseInt(params.offset);
			this.limit = parseInt(params.limit);
			$(this.el).off('click', '#nextPackBtn');
			$(this.el).off('click', '.cardsViewBtn');
			$(this.el).off('click', '.listViewBtn');
		},
		render: function(data) {
			this.data = data;
			this.data = data;
			if(this.mode == "list") {
				this.$el.html( this.listTemplate(this.data) );
			} else {
				this.$el.html( this.cardsTemplate(this.data) );
			}
			this.showNextPack();
		},
		loadNextPack: function() {
			var view = this;
			view.data.collection.fetch({
				data: {offset: view.offset + view.limit, limit: view.limit},
				success: function() {
					view.offset = view.offset + view.limit;
					view.showNextPack();
					//TODO: update url
				},
				error: function() {
					//TODO: show error
				}
			});
		},
		showNextPack: function() {
			var view = this;
			view.data.collection.each(function(single) {
				if(view.mode == "list") {
					console.log($(".super-list"));
					$(".super-list").append( view.itemTemplate({model: single}) );
				} else {
					console.log(view.$('.cards'));
					view.$('#collection').append( view.cardTemplate({model: single}) );
				}
			});
			if(view.data.collection.length < view.limit) $("#nextPackBtn").hide();
		},
		switchToCardsMode: function () {
			this.mode = "cards";
			this.render(this.data);
		},
		switchToListMode: function () {
			this.mode = "list";
			this.render(this.data);
		}
	});

	return ViewList;
});