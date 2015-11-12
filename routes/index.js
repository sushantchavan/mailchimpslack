var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/invite', function(req, res, next) {
  var data = req.body
  console.log('This is the request coming from mailchimp')
  console.log(data);
});

module.exports = router;
