define(['jquery', 'bloodhound'], function ($, Bloodhound) {

	var sources = {};

	sources.users = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: '/api/users?name=',
			replace: function(url, query) {
				return url + query;
			}
		}
	});

	return sources;
});