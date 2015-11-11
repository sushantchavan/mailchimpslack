var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var moment = require('moment');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  firstname : {type: String, default:''},
  lastname : {type: String, default:''},
  email    : {type: String, unique: true},
  password : {type: String},
  authData : {google:{}, facebook:{}, twitter:{}},
  gender: {type: String, default:''},
  city: {type: String, default:''},
  company: {type: String, default:''},
  designation: {type: String, default:''},
  slackinvite : {type: Boolean, default: false}

 });

userSchema.plugin(timestamps);
module.exports.user = mongoose.model('user', userSchema);