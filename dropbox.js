var dropbox = (function(){
	var CLIENT_ID = "5tssbcxxu7f3w8t"
	var AUTH_URL = "https://www.dropbox.com/1/oauth2/authorize?";

	/* returns the access token if available (already authorized), in other case returns undefined */
	var getToken = function(){
		return utils.getUrlParameter('access_token');
	};

	/* returns if the access token is available (already authorized) */
	var isTokenAvailable = function(){
		return typeof(utils.getUrlParameter('access_token')) !== 'undefined';
	};

	/* redirects to dropbox auth url with the callers redirection url */
	var authorize = function(){
		var redirect_uri = document.location.href.split('?')[0];

		var params = {
			'response_type': 'token',
			'client_id' : CLIENT_ID,
			'redirect_uri' : redirect_uri

		};

		var p = $.param(params);

		var url = AUTH_URL + p;
		document.location.href = url;
	};

	var getAccountInfo = function(callback){
		var p = {
			'access_token': getToken()
		};

		$.get('https://api.dropboxapi.com/1/account/info', p, function(data){
			// data is string, not object
			callback(data);
		});
	};

	var uploadImage = function(img){
		// TODO: upload image to dropbox
	};




	return {
		getToken: getToken,
		isTokenAvailable: isTokenAvailable,
		authorize: authorize,
		getAccountInfo: getAccountInfo,
		uploadImage: uploadImage
	};

})();

