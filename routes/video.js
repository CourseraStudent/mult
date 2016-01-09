var express = require('express');
var router = express.Router();

/* GET video listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a video resource');
});

module.exports = router;
