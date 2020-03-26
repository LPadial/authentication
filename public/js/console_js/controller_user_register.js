//File: controllers/user.js
var mongoose = require('mongoose');
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var createToken = require('../services/jwt');

// --------------------- USER CONTROLLER FUNCTIONS ---------------------

//POST - Insert a new user in the DB
exports.addUser = function(req, res) {
	var user = new User({
		email : req.body.email,
		password : req.body.password,
		name : req.body.name,
		surname : req.body.surname,
		nickname : req.body.nickname,
		role : 'user'
	});
	console.log(req.body.password)
	console.log(req)
	if(req.body.password){
		bcrypt.hash(req.body.password, 5, (err, hash) =>{
			if(err) return res.status(500).send(err.message);
			user.password = hash;
			user.save(function(err) {
				if(err) return res.status(500).send(err.message);
				res.status(200).jsonp(user);
			});
		});
	}
};
