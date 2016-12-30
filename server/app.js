var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('./strategies/userStrategy.js');
var session = require('express-session');

//load the environment variables from a non-tracked env.js file in the root folder
var env = require('../env.js');

// modules
var favorites = require('./routes/favorites');
var favoritesSearchWords = require('./routes/favoritesSearchWords');
var searchWords = require('./routes/searchWords');
var youtubeAPIKey = require('./routes/youtubeAPIKey');
var user = require('./routes/user');
var register = require('./routes/register');
var index = require('./routes/index');


// middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// express routes
app.use('/favorites', favorites);
app.use('/favoritesSearchWords', favoritesSearchWords);
app.use('/searchWords', searchWords);
app.use('/youtubeAPIKey', youtubeAPIKey);
app.use('/user', user);
app.use('/register', register);
app.use('/', index);

// start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('listening on port ', app.get('port'));
});
