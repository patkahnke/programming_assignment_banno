var express = require('express');
var router = express.Router();
var pg = require('pg');
var database = process.env.database;
var user = process.env.user;
var password = process.env.password;
var connectionString = 'postgres://localhost:5432/' + database;

router.post('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO favorites_search_words (search_word_id, favorite_id) ' +
                  'VALUES ($1, $2)',
                   [req.body.searchWordID, req.body.favoriteID],
     function (err, result) {
       done();

       if (err) {
         res.sendStatus(500);
         return;
       }

       res.sendStatus(201);
   });
  });
});

module.exports = router;
