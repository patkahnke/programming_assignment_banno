var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/patkahnke';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM favorites', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

// router.post('/', function (req, res) {
//   var movie = req.body;
//
//   pg.connect(connectionString, function (err, client, done) {
//     if (err) {
//       res.sendStatus(500);
//     }
//
//     client.query('INSERT INTO movies (title, year, director) ' +
//                   'VALUES ($1, $2, $3)',
//                    [movie.title, movie.videoID, movie.keyword],
//                  function (err, result) {
//                    done();
//
//                    if (err) {
//                      res.sendStatus(500);
//                      return;
//                    }
//
//                    res.sendStatus(201);
//                  });
//   });
// });

router.post('/', function (req, res) {
  var favorite = req.body;
console.log('favorite: ', favorite);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO favorites (title, videoid, thumbnail, comments, keyword, date_added) ' +
                  'VALUES ($1, $2, $3, $4, $5, $6)',
                   [favorite.title, favorite.videoid, favorite.thumbnail, favorite.comments,
                     favorite.keyword, favorite.date_added],
                     function (err, result) {
                       done();

                       if (err) {
                         console.log('favorite inside query: ', favorite);
                         res.sendStatus(500);
                         return;
                       }

                       res.sendStatus(201);
                     });
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var favorite = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE favorites ' +
                  'SET comments = $1, ' +
                  'keyword = $2' +
                  'WHERE id = $4',
                   [favorite.comments, favorite.keyword, id],
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

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('DELETE FROM favorites ' +
                  'WHERE id = $1',
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
