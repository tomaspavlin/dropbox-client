var dropbox = (function(){
	var CLIENT_ID = "m61dg1tp46ggqy4";
	var AUTH_URL = "https://www.dropbox.com/1/oauth2/authorize?";
  var ACCESS_TOKEN;

	/* returns the access token if available (already authorized), in other case returns undefined */
	var getToken = function(){
    ACCESS_TOKEN = ACCESS_TOKEN || utils.getUrlParameter('access_token');
		return ACCESS_TOKEN;
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

	var uploadImage = function(fileName, data, cb){
    $.ajax({
      url: 'https://content.dropboxapi.com/1/files_put/auto/' + fileName +
        '?access_token=' + getToken(),
      type: 'POST',
      data: data,
      success: function() { cb() },
      error: function(e) { cb(e) },
      cache: false,
      contentType: false,
      processData: false
    });
	};




	return {
		getToken: getToken,
		isTokenAvailable: isTokenAvailable,
		authorize: authorize,
		getAccountInfo: getAccountInfo,
		uploadImage: uploadImage
	};

})();

