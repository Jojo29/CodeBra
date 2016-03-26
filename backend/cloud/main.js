
//Gets list of places with reviews within a certain 
//input: 	location(GeoPoint)
//			locationType(string)
Parse.Cloud.define("getPlaces", function(request, response) {
	//var radius = 5;
	var query = new Parse.Query("Review");
	query.equalTo("locationType", request.params.locationType);
	query.near("location",request.params.location);
	query.limit(10);

	query.include("reviews");
	query.descending("rank");	//sort by rank

	query.find({
		success: function(places) {
		  
		  response.success(places);
		},
		error: function() {
		  response.error("Places lookup failed");
		}
	});
});

//Creates review
Parse.Cloud.define("createReview", function(request, response) {

	//create review object and populate it with variables
	var review = new Parse.Object("Review");
	review.set("comments", request.params.comments);
	review.set("rank", request.params.rank);
	review.set("hasRamps", request.params.hasRamps);
	review.set("hasWideDoors", request.params.hasWideDoors);
	review.set("isNavigationEasy", request.params.isNavigationEasy);
	review.set("picture", request.params.picture);


	//get place object and update it
	var newRank,totalReviewScores,totalNoOfReviews;
	var placeQuery = new Parse.Query("Place");
	query.get(request.params.place,{
		success: function(place) {

				//update no of reviews, total reviews scores and average rank
				totalNoOfReviews = totalNoOfReviews + 1;
				totalReviewScores = totalReviewScores + request.params.rank;
				newRank = totalReviewScores/totalNoOfReviews;
				place.set("rank", newRank);
				place.set("totalNoOfReviews", totalNoOfReviews);
				place.set("totalNoOfReviews", totalNoOfReviews);

				place.add("reviews", review);

				//save place object
			  	place.save(null, {
				  success: function(place) {
				  		//save review object
					review.save(null, {
					  success: function(review) {

					  	//update 
					  	response.success("Review saved!");
					    // The object was saved successfully.
					  },
					  error: function(review, error) {
					  	console.log("Saving review failed");
				      	response.error("Review save failed");
					    // The save failed.
					    // error is a Parse.Error with an error code and message.
					  }
					});
				  	
				  },
				  error: function(place, error) {
				  	console.log("Saving place failed");
			      	response.error("Place save failed");
				    // The save failed.
				    // error is a Parse.Error with an error code and message.
			  	}
			});
		},
		error: function() {
		  response.error("Place query failed");
		}
	});

	/*
	//save review object
	review.save(null, {
	  success: function(review) {

	  	//update 
	  	response.success("Review saved!");
	    // The object was saved successfully.
	  },
	  error: function(review, error) {
	  	console.log("Saving review failed");
      	response.error("Review save failed");
	    // The save failed.
	    // error is a Parse.Error with an error code and message.
	  }
	});
	*/
  	
});

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});
