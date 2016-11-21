var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//load the environment variables from a non-tracked env.js file in the root folder
var env = require('../env.js');

// modules
var index = require('./routes/index');
var favorites = require('./routes/favorites');
var youtubeAPIKey = require('./routes/youtubeAPIKey');

// middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express routes
app.use('/favorites', favorites);
app.use('/youtubeAPIKey', youtubeAPIKey);
app.use('/', index);

// start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('listening on port ', app.get('port'));
});
