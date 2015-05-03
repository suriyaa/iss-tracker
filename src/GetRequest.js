module.exports = function(url, type) {
	if(type == "jsonp") {
		return new Promise(function(resolve,reject) {
			var callbackName = 'jsonp_callback_' + Math.round(10000 * Math.random());
			window[callbackName] = function(data) {
				delete window[callbackName];
				document.body.removeChild(script);
				resolve(data);
			};
			var script = document.createElement('script');
			script.src = url + (url.indexOf('?') >=0 ? '&' : '?') + 'callback=' + callbackName;
			document.body.appendChild(script);
		});
	} else {
		return new Promise(function(resolve, reject) {
			var x = new window.XMLHttpRequest();
			x.onreadystatechange = function() {
				if(x.readyState == 4) {
					resolve(JSON.parse(x.responseText));
				}
			}
			x.open('GET', url);
			x.send();
		});
	}
};
