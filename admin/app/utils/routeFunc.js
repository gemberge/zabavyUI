define(['jquery'], function ($) {

	var func = {};

	func.parseRequestParam = function(paramString) {
		var params = {};
		if(paramString) {
			$.each(paramString.split('&'), function (index, value) {
				if(value){
					var param = value.split('=');
					params[param[0]] = param[1];
				}
			});
		}
		return params;
	};

	return func;
});