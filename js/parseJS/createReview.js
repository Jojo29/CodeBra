function createReview() {
	var place = "GPn9XTs2Dy";
	var comments = $("#inputlg").val();
	var rank = 5;
	var hasRamps = true;
	var hasWideDoors = true;
	var isNavigationEasy = true;
	var picture = null;
	var params = { 
			    	place: place, 
			    	comments: comments, 
			    	rank: rank, 
			    	hasRamps: hasRamps, 
			        hasWideDoors: hasWideDoors, 
			        isNavigationEasy: isNavigationEasy, 
			        picture: picture
			    };
			    
			    Parse.Cloud.run("createReview", params).then(function(result) {
			   		// make sure the set the enail sent flag on the object
			        console.log("result :" + JSON.stringify(result))
			    }, function(error) {
			        alert("ERROR: ", error.message);
			    });
}