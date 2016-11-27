var express = require('express');
var router = express.Router();
var pg = require('pg');
var user = process.env.user;
var password = process.env.password;
var connectionString = 'postgres://localhost:5432/patkahnke?user=' + user + '&password=' + password;

router.post('/', function (req, res) {
  var searchWord = req.body.searchWord;
  console.log('req.body.searchWord: ', req.body.searchWord);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO search_words (search_Word) ' +
                  'VALUES ($1)',
                   [searchWord],
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

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM search_words', function (err, result) {
      done();
console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

router.delete('/:search_word_id', function (req, res) {
  var id = req.params.search_word_id;
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM search_words ' +
                  'WHERE search_word_id = $1',
                   [id],
     function (err, result) {
       done();

       if (err) {
         console.log(err);
         res.sendStatus(500);
         return;
       }

       res.sendStatus(200);
      });
  });
});

module.exports = router;
