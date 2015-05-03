var co = require('co'),
	get = require('./src/GetRequest'),
	maps = require('./src/GoogleMaps'),
	updateTimeInterval = 1000,
	api = "https://api.wheretheiss.at/v1/satellites/25544",
	map, issmarker, issinfo, timer;

document.addEventListener('DOMContentLoaded', function() {
	co(getLocationJSON)
		.then(initLocation)
		.then(addEvents)
		.then(startPolling)
		.catch(function(err) {
			console.log(err.stack);
			clearInterval(timer);
		})
});

function *getLocationJSON() {
	return yield get(api, 'json');
}

function initLocation(iss) {
	map = maps.Init(iss.latitude, iss.longitude);
	issmarker = maps.ISSMarker(map, iss);
	issinfo = maps.InfoWindow(map, iss);
	issinfo.open(map, issmarker);
	return iss;
}

function addEvents(iss) {
	google.maps.event.addListener(issmarker, 'click', function() {
		issinfo.open(map, issmarker);
	});
	return iss;
}

function startPolling(iss) {
	timer = setInterval(function() {
		co(getLocationJSON)
			.then(updateLocation)
			.catch(function(err) {
				clearInterval(timer);
				console.log(err.stack);
			});
	}, updateTimeInterval);
	return iss;
}

function updateLocation(iss) {
	var newContent = maps.FormatISSInfo(iss);
	if(issinfo.getContent !== newContent) issinfo.setContent(newContent);
	var center = new google.maps.LatLng(iss.latitude, iss.longitude);
	issmarker.setPosition(center);
	map.panTo(center);
};

if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js', {
		scope: './'
	}).then(function(reg) {
			console.log("Service worker registered")
		}).catch(function(err) {
			console.log(err);
		});
}
