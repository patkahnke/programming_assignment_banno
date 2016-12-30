
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Store this user's unique id in the session for later reference
// Only runs during authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log('user serialized:', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
//TODO SQL query
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    if(err) {
      console.log(err);
      done(err);
    }

    var user = {};
    console.log('called deserializeUser - pg');


    client.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
      client.end();

      // Handle Errors
      if(err) {
        console.log(err);
        done(err);
      }

      user = result.rows[0];

      if(!user) {
          // user not found
          return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found
        console.log('User row', user);
        done(null, user);
      }

    });
  });
});

// Does actual work of logging in
// Called by middleware stack
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    }, function(req, username, password, done){
	    pg.connect(connection, function (err, client) {
	    	console.log('called local - pg');
	    	var user = {};
        // assumes the username will be unique, thus returning 1 or 0 results
        var query = client.query("SELECT * FROM users WHERE username = $1", [username]);
        query.on('row', function (row) {
        	console.log('User obj', row);
        	user = row;

            // Hash and compare
          if(encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('passwords match');
            done(null, user);
          } else {
            console.log('password does not match');
            done(null, false, {message: 'Incorrect credentials.'});
          }
        // }

        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
          console.log('query.on end called user.js strategies');
          console.log('user: ', user);
          if (!user.username) {
            // user not found
            console.log('userStrategy.js :: no user found');
            return done(null, false, {message: 'Incorrect credentials.'});
          } else {
            client.end();
          }
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
	    });
    }
));

module.exports = passport;
