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
    "rating": "Not yet rated."
  },
  {
    "songName": "For you",
    "genre": "Pop",
    "artist": "Timeflies",
    "duration": 420,
    "rating": "Not yet rated."
  },
  {
    "songName": "Boom Clap",
    "genre": "Pop",
    "artist": "Charli XCX",
    "duration": 210,
    "rating": "Not yet rated."
  },
  {
    "songName": "An Ending",
    "genre": "House",
    "artist": "Brian Eno",
    "duration": 180,
    "rating": "Not yet rated."
  },
  {
    "songName": "Love me like you do",
    "genre": "Rock",
    "artist": "Ellie Goulding",
    "duration": 300,
    "rating": "Not yet rated."
  },
  {
    "songName": "Keep your head up",
    "genre": "Rock",
    "artist": "Andy Grammer",
    "duration": 220,
    "rating": "Not yet rated."
  },
  {
    "songName": "Beautiful things",
    "genre": "Chillstep",
    "artist": "Andain",
    "duration": 226,
    "rating": "Not yet rated."
  },
  {
    "songName": "Alpha",
    "genre": "Rock",
    "artist": "Vangelis",
    "duration": 344,
    "rating": "Not yet rated."
  }
];

var playlist = [
  {
    "songName": "Alpha",
    "genre": "Rock",
    "artist": "Vangelis",
    "duration": 344,
    "rating": "Not yet rated."
  },
  {
    "songName": "Beautiful things",
    "genre": "Chillstep",
    "artist": "Andain",
    "duration": 226,
    "rating": "Not yet rated."
  },
  {
    "songName": "Love me like you do",
    "genre": "Rock",
    "artist": "Ellie Goulding",
    "duration": 300,
    "rating": "Not yet rated."
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
  playlist.push(req.body);
  console.log(req.body);
  res.end("Finished.");
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
