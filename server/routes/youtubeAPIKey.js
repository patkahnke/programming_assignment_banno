var express = require('express');
var router = express.Router();

//configuration variables
var config = {
  youTubeAPIKey: process.env.youTubeAPIKey,
};

router.get('/', function (req, res) {
  res.send(config);
});

module.exports = router;
