var express = require('express'),
  cors = require('cors'),
  app = express();

var mongojs = require('mongojs');
var connectionString = process.env.MONGOLAB_URI;

app.use(cors());
app.use(express.bodyParser());
app.set('port', (process.env.PORT || 3000));

var databaseArrays = [
  "songs"
];

var db = mongojs(connectionString, databaseArrays);

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
