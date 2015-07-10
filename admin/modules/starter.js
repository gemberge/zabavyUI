(function() {

	new App.Router;
	Backbone.history.start();

	$('#search').typeahead(null, {
		name: "autocomplete",
		display: 'nickname',
		source: App.Data.Sources.users,
		templates: {
			empty: [
				'<div class="tt-suggestion">',
				'нічого такого немає',
				'</div>'
			].join('\n'),
			suggestion: _.template('<div> <%= nickname %> </div>')
		}
	});

	$('#search').bind('typeahead:select', function(ev, suggestion) {
		console.log(suggestion);
	});

})();