var express = require('express');
var router = express.Router();

var User = require('../collections/users');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('service working');
});

router.post('/invite', function(req, res, next) {
  var data = req.body
  console.log('This is the request coming from mailchimp')
  console.log(data);
  User.
  res.send('POST request works');
});

router.get('/invite', function(req, res, next) {
	var data = req.body;
	res.send('GET request works');
});

module.exports = router;
