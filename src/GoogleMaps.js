var GoogleMaps = {
	Init: function(lat, lng) {
		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(lat, lng),
			disableDefaultUI: true,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_CENTER
			}
		};
		return new google.maps.Map(document.getElementById('map-container'), mapOptions);
	},
	InfoWindow: function(map, iss) { 
		return new google.maps.InfoWindow({
			content: GoogleMaps.FormatISSInfo(iss),
			maxWidth: 100
		});
	},
	ISSMarker: function(map, iss) {
		return new google.maps.Marker({
			position: map.getCenter(),
			icon: 'public/images/iss.png',
			map: map
		})
	},
	FormatISSInfo: function(iss) {
		var html = "<div>"
		html += "<b>Vel</b>: " + Math.round(iss.velocity) + " KM/H<br/>";
		html += "<b>Alt</b>: " + Math.round(iss.altitude) + " KM";
		html += "</div>";
		return html;
	}
};

module.exports = GoogleMaps;
