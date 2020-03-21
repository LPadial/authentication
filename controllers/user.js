//File: controllers/user.js
var mongoose = require('mongoose');
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var createToken = require('../services/jwt');

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

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.email = req.body.email;
		user.name = req.body.name;
		user.surname = req.body.surname;
		user.nickname = req.body.nickname;
		user.role = req.body.role;

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
	});
};

//DELETE - Delete a user with specified ID
exports.deleteUser = function(req, res) {
	User.remove({ _id: req.params.id }, function (err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).send("El usuario ha sido borrado.");
	});
};

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
		if(err) res.send(500, err.message);

		console.log('GET /users')
		res.status(200).jsonp(users);
	});
};

//GET - Return a user with specified ID
exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if(err) return res.send(500, err.message);

		console.log('GET /user/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//LOGIN
exports.loginUser = function(req, res) {
	console.log("loginUser")
	var email = req.body.email;
	var password = req.body.password;
	var nickname = req.body.nickname;

	console.log(req.body)

	User.findOne({$or: [
		{email: email},
		{nickname: nickname}
		]}, (err, user) =>{
		if(err){
			console.log('550:Email o contraseña incorrectos')
			res.status(500).send({message: 'Email o contraseña incorrectos'});
		}else{
			if(!user){
				console.log('!user:Email o contraseña incorrectos')
				res.status(404).send({message: 'Email o contraseña incorrectos'});
			}else{
				bcrypt.compare(password, user.password, function(err,check){
					if(check){
						if(req.body.gethash == 'true'){
							//Devolver un token de jwt
							let token = createToken(user).then((tkn)=>{ 
								res.status(200).send({
									token: tkn
								});
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'Email o contraseña incorrectos'});
						console.log("Email o contraseña incorrectos")
					}
				});
			}
		}
	});
}
