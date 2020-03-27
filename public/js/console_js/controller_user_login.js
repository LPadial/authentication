//File: controllers/user.js
var mongoose = require('mongoose');
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var createToken = require('../services/jwt');

// --------------------- USER CONTROLLER FUNCTIONS ---------------------
//LOGIN
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
							let urladmin = "https://www.app.losuratech.com/public/admin_section.html";
							let url = user.role=="admin"? urladmin :"https://www.app.losuratech.com/public/profile_section.html";
							
							let token = createToken(user).then((tkn)=>{ 
								res.status(200).send({
									token: tkn,
									user: [user._id, user.email,user.name, user.surname,user.nickname, user.role],
									url: url
								});
							});
						}else{
							console.log('Envio user')
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