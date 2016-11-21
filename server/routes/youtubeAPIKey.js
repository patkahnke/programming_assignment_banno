var express = require('express');
var router = express.Router();

//configuration variables
var config = {
  youtubeAPIKey: process.env.youtubeAPIKey,
};

router.get('/', function (req, res) {
  res.send(config);
});

module.exports = router;
