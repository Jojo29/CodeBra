function getPlaces() {
	    	var locationType = "hotel";
	    	var location = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
		    var params = { 
		    	location: location, 
		    	locationType: locationType
		    };

		    Parse.Cloud.run("getPlaces", params).then(function(result) {
				// make sure the set the enail sent flag on the object
			        console.log("result :" + JSON.stringify(result));
			        alert("RESULT");
			    }, function(error) {
			        alert("ERROR");
		    });
}