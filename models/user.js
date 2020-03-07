 var mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

  var userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required:true
    },
    nickname: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
      required:true,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true
    }
  });

  module.exports = mongoose.model('User', userSchema);
