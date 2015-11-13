var request = require('request');

var User = require('./userSchema').user;

var SLACK_URL = process.env.SLACK_URL
console.log('SLACK URL TO ping');
console.log(SLACK_URL);

function sendSlackinvite (user, callback) {
    console.log('inside send slack auto invite');
    console.log('This is the user');
    console.log(user);
    var timestamp = Math.floor(Date.now() / 1000);
    var body = {
            "email" : user.email,
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
                user.slackinvite = true;
                callback(err, user)
        }
    });
}


var self = module.exports = {
    register: function(data, callback) {
        console.log('This is the data coming from the mailchimp');
        console.log(data['email']);
    	User.findOne({'email': data['email']}, function(err, user){
    		if(err){console.log(err); callback(err, null);}
    		else if(user) {
                console.log('let the world know what the user is all about');
    			if(user.slackinvite) {
    				callback(err, user);
    			} else {
                    sendSlackinvite(user, function(err, updatedUser){
                        if(err) {console.log(err); callback(err, null);}
                        else {
                            updatedUser.save(function(err, savedUser) {
                                if(err) {console.log(err); callback(err, null);}
                                else {
                                    callback(err, updatedUser);    
                                }
                            });
                        }
                    });
                }
    		} else {
                var newUser = new User();
                newUser.email = data['email'];
                sendSlackinvite(newUser, function(err, updatedUser){
                    if(err) {console.log(err); callback(err, null);}
                    else {
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