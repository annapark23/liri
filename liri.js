require('dotenv').config();

var selection = process.argv[2];
var search = process.argv.splice(3).join(" ");

var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios');

var Spotify = require('node-spotify-api');var spotify = new Spotify({
        id: '213f2cd0422a4af8b6929b9fe36e5e9a',
        secret: '56aaf3cbabd04d02b4d1850624263226'
    });

//concert function--------------------------------------------
function getConcert(){
    if(search === ""){
        console.log("A band/artist is needed to search concert information. Please try again.")
    } else{
        axios.get('https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp')
    .then(function (response) {
        var results = response.data;
        var showReults =[
            "Venue: " + results[0].venue.name,
            "venue Location: " + results[0].venue.city + results[0].venue.region,
            "Date of the event: " + results[0].datetime

        ].join("\n\n");
      console.log(showReults);
    })
    .catch(function (error) {
      console.log(error);
    });

    }
}

//movie function------------------------------------------------
function getMovie(){
    if(search === ""){
        console.log("A movie title is needed to search movie information. Please try again.")
    }else {
        axios.get('https://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy')
        .then(function (response) {
        var results = response.data
        var showReults =[
            "Title: " + results.Title,
            "Release Date: " + results.Year,
            "IMDB Rating: " + results.imbdRating,
            "Rotten Tomatoes Rating: " + results.Ratings[1].Value,
            "Produced In: " + results.country,
            "Language: " + results.Country,
            "Plot: " + results.Plot, 
            "Actors: " + results.Actors 

        ].join("\n\n");  
        console.log(showReults);
        })
    .catch(function (error) {
        console.log(error);
    });

    }
}

//spotify function
function getSong(){
    
    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("Song: " + data.tracks.items[0].name); 
        console.log("Album Cover: " + data.tracks.items[0].preview_url);       
        console.log("Album: " + data.tracks.items[0].album.name); 
    });

}
//get text from random.txt-----------------------------------
function getText(){
fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    
    var dataArr = data.split(",");

    spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("Song: " + data.tracks.items[0].name); 
        console.log("Album Cover: "+ data.tracks.items[0].preview_url);       
        console.log("Album: " + data.tracks.items[0].album.name); 
    });
      
  });
}

//if nothing was input at all, coraline will be printed 
if(!selection){
    selection = "movie-this";
}
if(!search){
    search = "Coraline";
}

//concert api ------------------------------------------------
if(selection === "concert-this"){
    console.log("Searching for Concert");
    getConcert();
}
//spotify api -----------------------------------------------
else if(selection === "spotify-this-song"){
    console.log("Searching for Song");
    getSong();
    
}

//omdb api -----------------------------------------------------
else if(selection === "movie-this"){
    console.log("Searching for Movie");
    getMovie();
}

//text file spotify 
else if(selection === "do-what-it-says"){
    getText();

}
