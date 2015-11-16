var express = require('express');
var router = express.Router();

var User = require('../collections/users');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('service working');
});

router.post('/invite', function(req, res, next) {
  var data = {};
  data['email'] = req.body['data[email]'];
  User.register(data, function(err, updatedUser){
  	if(err) { res.send('invite failed'); }
  	else {
  		if(updatedUser.slackinvite) {
  			res.send('invite successfully sent');
  		} else {
  			res.send('something went wrong with the invite');
  		}
  		
  	}
  })
});

router.get('/invite', function(req, res, next) {
	var data = req.body;
	res.send('GET request works');
});

module.exports = router;
