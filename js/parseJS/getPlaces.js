
function getName(obj) {
	return obj.name;
}
function getRank(obj) {
	return obj.rank;
}
function getLocationType(obj) {
	return obj.locationType;
}
function getPicture(obj) {
	return obj.picture;
}
function getTotalNoOfReviews(obj) {
	return obj.totalNoOfReviews;
}
function getComments(obj) {
	return obj.reviews.comments;
}
function doesHaveRamps(obj) {
	return obj.reviews.hasRamps;
}
function doesHaveWideDoors(obj) {
	return obj.reviews.hasWideDoors;
}
function getReviewRank(obj) {
	return obj.reviews.reviewRank;
}
function doesHaveEasyNavigation(obj) {
	return obj.reviews.isNavigationEasy;
}

function getPlaces() {
	var locationType = "hotel";
	var location = new Parse.GeoPoint({latitude: 42.0, longitude: -71.0});
	var params = { 
	   	location: location, 
	   	locationType: locationType
	};

	Parse.Cloud.run("getPlaces", params).then(function(result) {
		// make sure the set the enail sent flag on the object
		console.log("result :" + result[0].createdAt);
		console.log("result :" + JSON.stringify(result));
		//$("#numOfReviews0").html("" + result[0].totalNoOfReviews + " people have reviewed this");
		//$("#numOfReviews1").html("" + getTotalNoOfReviews(result[1]) + " people have reviewed this");
		//$("#numOfReviews2").html("" + getTotalNoOfReviews(result[2]) + " people have reviewed this");
		//$("#reviewsImg0").attr("src", (getPicture(result[0])) );

		}, function(error) {
		    alert("ERROR");
	});
}