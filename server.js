var express = require('express'),
  cors = require('cors'),
  app = express();

var mongojs = require('mongojs');
var connectionString = process.env.MONGOLAB_URI;

app.use(cors());
app.use(express.bodyParser());
app.set('port', (process.env.PORT || 3002));

var songList = [
  {
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": 220,
    "rating": 0
  },
  {
    "songName": "For you",
    "genre": "Pop",
    "artist": "Timeflies",
    "duration": 420,
    "rating": 0
  },
  {
    "songName": "Boom Clap",
    "genre": "Pop",
    "artist": "Charli XCX",
    "duration": 210,
    "rating": 0
  },
  {
    "songName": "An Ending",
    "genre": "House",
    "artist": "Brian Eno",
    "duration": 180,
    "rating": 0
  },
  {
    "songName": "Love me like you do",
    "genre": "Rock",
    "artist": "Ellie Goulding",
    "duration": 300,
    "rating": 0
  },
  {
    "songName": "Keep your head up",
    "genre": "Rock",
    "artist": "Andy Grammer",
    "duration": 220,
    "rating": 0
  },
  {
    "songName": "Beautiful things",
    "genre": "Chillstep",
    "artist": "Andain",
    "duration": 226,
    "rating": 0
  },
  {
    "songName": "Alpha",
    "genre": "Rock",
    "artist": "Vangelis",
    "duration": 344,
    "rating": 0
  }
];

var playlist = [
  {
    "songName": "Alpha",
    "genre": "Rock",
    "artist": "Vangelis",
    "duration": 344,
    "rating": 0
  },
  {
    "songName": "Beautiful things",
    "genre": "Chillstep",
    "artist": "Andain",
    "duration": 226,
    "rating": 0
  },
  {
    "songName": "Love me like you do",
    "genre": "Rock",
    "artist": "Ellie Goulding",
    "duration": 300,
    "rating": 0
  }
];

// var db = mongojs(connectionString, databaseArrays);

app.get('/songs', function(req, res) {
  res.contentType('application/json');
  res.send(songList);
});

app.get('/playlist', function(req, res) {
  res.contentType('application/json');
  res.send(playlist);
});

app.post('/playlist/add', function(req, res) {
  // Backend should check if the song already exists in the playlist
  playlist.push(req.body);
  console.log(req.body);
  res.end("Finished.");
});

app.delete('/playlist/remove', function(req, res) {
  var name = req.header('songName');
  for (var song in playlist) {
    if (playlist.hasOwnProperty(song)) {
      if(playlist[song].songName === name) {
        playlist.splice(song, 1);
      }
    }
  }
  res.send(playlist);
  res.end("Finished.");
});

app.get('/rates', function(req, res) {
 var rates = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
 res.send(rates);
});

app.post('/playlist/rateSong', function(req, res) {
  var name = req.header('songName');
  var rate = req.header('rate');
  for (var song in playlist) {
    if (playlist.hasOwnProperty(song)) {
      if(playlist[song].songName === name) {
        playlist[song].rating = rate;
      }
    }
  }
  res.send(playlist);
  res.end("Finished.");
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
