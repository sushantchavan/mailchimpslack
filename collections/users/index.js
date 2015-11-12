var _ = require('underscore');
var async = require('async');
var request = require('request');

var User = require('./userSchema').user;

var SLACK_URL = process.env.SLACK_URL


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
                    var timestamp = Math.floor(Date.now() / 1000);
                    var invite_url = 
                    var body = {
                        "email" : data['email'],
                        "set_active":true,
                        "token" : process.env.SLACK_TOKEN,
                        "_attempts":1
                    }

                    request({
                        url: SLACK_URL + 'api/users.admin.invite?t='+ timestamp, //URL to hit
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:body //Set the body as a string
                    }, function(error, response, body){
                        if(error) {
                            console.log(error);
                        } else {
                            console.log('we get the response from slack')
                            console.log(response)
                            console.log(response.statusCode, body);
                            user.slackinvite = true;
                            user.save(function(err, savedUser){
                                if(err) {console.log(err); callback(err, null);}
                                else {
                                    callback(err, user);
                                }
                            });
                        }
                    });

    			}
    		} else {

            }
    	});
    }

}