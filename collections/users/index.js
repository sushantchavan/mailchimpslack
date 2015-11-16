var request = require('request');
var _ = require('underscore');

var User = require('./userSchema').user;

var SLACK_URL = process.env.SLACK_URL
console.log('SLACK URL TO ping');
console.log(SLACK_URL);

function sendSlackinvite (user, callback) {
    var timestamp = Math.floor(Date.now() / 1000);
    var form_body = {
            "email" : user.email.toString(),
            "set_active":true,
            "token" : process.env.SLACK_API_TOKEN.toString(),
            "_attempts":1
        }
        //body = JSON.stringify(body);
	 request({
            url: SLACK_URL + 'api/users.admin.invite?t='+ timestamp, //URL to hit
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form:form_body //Set the body as a string
        }, function(error, response, body){
            console.log('do we event get here')
            body = JSON.parse(body);
            callback(error, body);
    });
}


var self = module.exports = {
    register: function(data, callback) {
        console.log('inside fetch user function');
        console.log(data);
    	User.findOne({'email': data['email']}, function(err, user){
    		if(err){console.log(err); callback(err, null);}
    		else if(user) {
    			if(user.slackinvite) {
    				callback(err, user);
    			} else {
                    sendSlackinvite(user, function(err, body){
                        if(err) {console.log(err); callback(err, null);}
                        else if(body) {
                            if(body['ok']) {
                                user.slackinvite = true;
                                user.save(function(err, savedUser) {
                                    if(err) {console.log(err); callback(err, null);}
                                    else {
                                        callback(err, savedUser);    
                                    }
                                });
                            } else {
                                callback(err, user)
                            }
                        }
                    });
                }
    		} else {
                var newUser = new User();
                newUser.email = data['email'];
                sendSlackinvite(newUser, function(err, body){
                    if(err) {console.log(err); callback(err, null);}
                    else if(body){
                        if(body['ok']) {
                            newUser.slackinvite = true;
                        }
                        newUser.save(function(err, savedUser){
                            if(err) {console.log(err); callback(err, null);}
                            else {
                                callback(err, savedUser);
                            }
                        });
                    }
                });
            }
    	});
    }
}