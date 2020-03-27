//File: controllers/user.js
var mongoose = require('mongoose');
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var createToken = require('../services/jwt');

// --------------------- USER CONTROLLER FUNCTIONS ---------------------

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
	User.find({}, '_id email name surname nickname role', function(err, users) {
		if(err) res.send(500, err.message);

		console.log('GET /users')
		res.status(200).jsonp(users);
	});
};
