//File: controllers/user.js
var mongoose = require('mongoose');
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var createToken = require('../services/jwt');

// --------------------- USER CONTROLLER FUNCTIONS ---------------------

//DELETE - Delete a user with specified ID
exports.deleteUser = function(req, res) {
	User.remove({ _id: req.params.id }, function (err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).send("El usuario ha sido borrado.");
	});
};