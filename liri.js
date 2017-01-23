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
	client.get("search/tweets", {q: "pethoang", count: 20}, function(error, tweets, response) {
		var tweetData = "";
		for (var i = 0; i < tweets.statuses.length; i++) {
			tweetData += "\n" + tweets.statuses[i].text + "\n";
		}
		console.log(tweetData);
		// logData(tweetData);
	}); 
}

//function for spotifyThisSong that pulls data from spotify

function spotifyThisSong() {
	// takes in user input for song name
	var song = input;

	// if no song is provded, the program will default to "or nah" by ty dolla $ign
	if (input === ""){
		song = "The Sign";
	}

	// this takes in the song request and searches for it using spotify
	spotify.search({type: "track", query: song}, function(err, data) {
		if (err) {
			console.log("Error: " + err);
			return;
		}
		else {
			var songData = "";
			var songReturn = data.tracks.items[0];

			var artist = "\n" + "Artist: " + songReturn.artists[0].name + "\n";
			songData += artist;

			var name = "\n" + "Song Name: " + songReturn.name + "\n";
			songData += name;

			var preview = "\n" + "Preview Link: " + songReturn.preview_url + "\n";
			songData += preview;

			var albumName = "\n" + "Album: " + songReturn.album.name + "\n";
			songData += albumName;

			console.log("\n" + "Spotify:");
			console.log(songData);
			// logData(songData);
		}
	});
}

// function for OMDB via request

function movieThis() {
	//takes in user input for movie title
	var movieTitle = input;

	// if no movie is provided, the program will default to "mr. nobody"
	if (input === "") {
		movieTitle = "Mr. Nobody";
	}

	// variable for the OMDb API call
	var OMDb = "http://omdbapi.com?t=" + movieTitle + "&r=json&tomatoes=true";

	// this takes in the movie request and searches for it in OMDb via request
	request(OMDb, function (err, response, body) {
		if (err) {
			console.log("Error: " + err);
			return;
		}
		else if (response.statusCode === 200) {
			var movie = JSON.parse(body);
			var movieData = "";

			var title = "\n" + "Movie Title: " + movie.Title + "\n";
			movieData += title;	

			var year = "\n" + "Year Released: " + movie.Year + "\n";
			movieData += year;

			var rating = "\n" + "IMDB Rating: " + movie.imdbRating + "\n";
			movieData += rating;	

			var country = "\n" + "Country: " + movie.Country + "\n";
			movieData += country;

			var language = "\n" + "Language: " + movie.Language + "\n";
			movieData += language;

			var plot = "\n" + "Movie Plot: " + movie.Plot + "\n";
			movieData += plot;	

			var actors = "\n" + "Actors: " + movie.Actors + "\n";
			movieData += actors;

			var tomatoMeter = "\n" + "Rotten Tomato Rating: " + movie.tomatoUserMeter + "\n";
			movieData += tomatoMeter;

			var tomatoURL = "\n" + "Rotten Tomato Rating Link: " + movie.tomatoURL + "\n";
			movieData += tomatoURL;

			console.log("\n" + "OMDb:");
			console.log(movieData);
			// logData(movieData);							
		}
	});
}