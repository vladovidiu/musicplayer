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
    "id": 1,
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": "3:40",
    "rating": "Not yet rated."
  },
  {
    "id": 2,
    "songName": "For you",
    "genre": "Pop",
    "artist": "Timeflies",
    "duration": "4:46",
    "rating": "Not yet rated."
  },
  {
    "id": 3,
    "songName": "Boom Clap",
    "genre": "Pop",
    "artist": "Charli XCX",
    "duration": "2:50",
    "rating": "Not yet rated."
  },
  {
    "id": 4,
    "songName": "An Ending",
    "genre": "House",
    "artist": "Brian Eno",
    "duration": "3:25",
    "rating": "Not yet rated."
  },
  {
    "id": 5,
    "songName": "Love me like you do",
    "genre": "Rock",
    "artist": "Ellie Goulding",
    "duration": "3:40",
    "rating": "Not yet rated."
  },
  {
    "id": 6,
    "songName": "Keep your head up",
    "genre": "Rock",
    "artist": "Andy Grammer",
    "duration": "3:10",
    "rating": "Not yet rated."
  },
  {
    "id": 7,
    "songName": "Beautiful things",
    "genre": "Chillstep",
    "artist": "Andain",
    "duration": "6:46",
    "rating": "Not yet rated."
  },
  {
    "id": 8,
    "songName": "Alpha",
    "genre": "Rock",
    "artist": "Vangelis",
    "duration": "5:44",
    "rating": "Not yet rated."
  }
];

var playlist = [
  {
    "id": 1,
    "songName": "Test",
    "genre": "Rock",
    "artist": "Rocking",
    "duration": "3:40",
    "rating": "Not yet rated."
  },
  {
    "id": 5,
    "songName": "Test4",
    "genre": "Rock",
    "artist": "Rocking",
    "duration": "3:40",
    "rating": "Not yet rated."
  },
  {
    "id": 8,
    "songName": "Test7",
    "genre": "Rock",
    "artist": "Rocking",
    "duration": "3:40",
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
