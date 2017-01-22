// require packages for twitter, spotify, request for OMDB, and fs

var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// takes in user parameters

var parameters = process.argv[2];

// takes in user input based on parameters

var input = "";
if (process.argv.length > 3) {
	input = process.argv[3];
	for (i = 4; i < process.argv.length; i++) {
		input += "" + process.argv[i];
	}
}

// switch statement used to determine actions based on user parameters

switch (parameters) {
	// runs the myTweets function based on the my-tweets parameter
	case "my-tweets":
		myTweets();
		break;
	// runs the spotifyThisSong function based on the spotify-this-song parameter
	case "spotify-this-song":
		spotifyThisSong();
		break;
	// runs the movieThis function based on the movie-this parameter
	case "movie-this":
		movieThis();
		break;
	// runs the doWhatItSays function based on the do-what-it-says parameter
	case "do-what-it-says":
		doWhatItSays();
		break;
}

// function for myTweets that pulls data from the twitter API

function myTweets() {
	// requires the keys.js file
	var twitterKeys = require("./keys.js").twitterKeys;

	// assigns keys and secrets
	var consumer_key = twitterKeys.consumer_key;
	var consumer_secret = twitterKeys.consumer_secret;
	var access_token_key = twitterKeys.access_token_key;
	var access_token_secret = twitterKeys.access_token_secret;

	// creates a new twitter object 
	var client = new twitter ({
		consumer_key: consumer_key,
		consumer_secret: consumer_secret,
		access_token_key: access_token_key,
		access_token_secret: access_token_secret
	});

	// searches for the 20 latest tweets by me (@pethoang) and consoles them out 
	client.get("search/tweets", {q: "pethoang", count: 20}, function(err, tweets, response) {
		var tweetData = "";
		for (var i = 0; i < tweets.statuses.length; i++) {
			tweetData += "\n" + tweets.statuses[i].text + "\n";
		}
		console.log(tweetData);
		// logData(tweetData);
	}); 
}