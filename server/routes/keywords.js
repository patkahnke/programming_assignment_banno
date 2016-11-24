var express = require('express');
var router = express.Router();
var pg = require('pg');
var user = process.env.user;
var password = process.env.password;
var connectionString = 'postgres://localhost:5432/patkahnke?user=' + user + '&password=' + password;

router.post('/', function (req, res) {
  var keyword = req.body.keyword;
  console.log('req.body.keyword: ', req.body.keyword);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO keywords (keyword) ' +
                  'VALUES ($1)',
                   [keyword],
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

    client.query('SELECT * FROM keywords', function (err, result) {
      done();
console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

router.delete('/:keyword_id', function (req, res) {
  var id = req.params.keyword_id;
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM keywords ' +
                  'WHERE keyword_id = $1',
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
