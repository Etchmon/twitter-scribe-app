require('dotenv').config();
var keys = require('./keys.js');

var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

var Query = process.argv[2];

var fs = require('fs');

var params = {screen_name: Query};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(!error) {
        var tweetFrom = '\nTweets from: @' + tweets[0].user.screen_name
        console.log(tweetFrom);
        fs.appendFileSync('Saved-Tweets.text', tweetFrom);
        for(var i = 0; i < tweets.length; i++) {
            var twitterResponse = '-----\n' + '\nTweet: ' + tweets[i].text + '\n Date of Tweet: ' + tweets[i].created_at + '\n'
            console.log(twitterResponse);
            fs.appendFileSync('Saved-Tweets.text', twitterResponse);
        }
    }
});