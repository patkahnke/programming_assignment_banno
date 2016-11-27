var express = require('express');
var router = express.Router();
var pg = require('pg');
var user = process.env.user;
var password = process.env.password;
var connectionString = 'postgres://localhost:5432/patkahnke?user=' + user + '&password=' + password;

router.post('/', function (req, res) {
  var favorite = req.body;
  console.log('favorite: ', favorite);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO favorites (title, videoid, thumbnail, date_added) ' +
                  'VALUES ($1, $2, $3, $4)',
                   [favorite.title, favorite.videoId, favorite.thumbnail, favorite.date_added],
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
  console.log('req.query: ', req.query);
  console.log('req.query.search: ', req.query.search);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else if (req.query.search == 0) {
      client.query('SELECT * FROM favorites', function (err, result) {
        done();
        res.send(result.rows);
      });
    } else {
      client.query('SELECT * FROM favorites ' +
                    'JOIN favorites_search_words ' +
                    'ON favorites.favorite_id=favorites_search_words.favorite_id ' +
                    'WHERE search_word_id=' + req.query.search,
                    function (err, result) {
        done();
        res.send(result.rows);
      });
    };
  });
});

// router.get('/', function (req, res) {
//   pg.connect(connectionString, function (err, client, done) {
//     if (err) {
//       res.sendStatus(500);
//     }
//
//     client.query('SELECT * FROM favorites', function (err, result) {
//       done();
//
//       res.send(result.rows);
//     });
//   });
// });

router.put('/:favorite_id', function (req, res) {
  var id = req.params.favorite_id;
  var favorite = req.body;
  console.log('req.body:', req.body);
  console.log('req.params.id: ', req.params.id);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE favorites ' +
                  'SET comments = $1, ' +
                  'WHERE favorite_id = $3',
                   [favorite.comments, id],
     function (err, result) {
       done();

       if (err) {
         res.sendStatus(500);
         return;
       }

       res.sendStatus(200);
     });
  });
});

router.delete('/:favorite_id', function (req, res) {
  var id = req.params.favorite_id;
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM favorites ' +
                  'WHERE favorite_id = $1',
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
