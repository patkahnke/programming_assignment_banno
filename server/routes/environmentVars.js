var express = require('express');
var router = express.Router();

//configuration variables
var config = {
  youtubeAPIKey: process.env.youtubeAPIKey,
};

router.get('/', function (req, res) {
  res.send(config);
  console.log('process.env.youtubeAPIKey: ', process.env.youtubeAPIKey);
  console.log('config: ', config);
});

module.exports = router;
