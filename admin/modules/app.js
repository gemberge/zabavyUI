window.App = {
	Models: {},
	Collections: {},
	Views: {},
	Router: {},
	Data: {
		Sources: {}
	}
};

App.Data.Sources.users = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.whitespace,
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	remote: {
		url: '/api/users?name=',
		replace: function(url, query) {
			return url + query;
		}
	}
});