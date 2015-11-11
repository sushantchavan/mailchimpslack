var _ = require('underscore');
var async = require('async');

var User = require('./userSchema').user;


function sendSlackinvite () {
	
}


var self = module.exports = {
    register: function(data, callback) {
    	User.findOne({'email': data['email']}, function(err, callback){
    		if(err){console.log(err); callback(err, null);}
    		else if(user) {
    			if(user.slackinvite) {
    				callback(err, user);
    			} else {

    			}
    		}
    	});
    }

}