var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

/*Para añadir un usuario realizar post con los siguientes campos:
email:username@ddss.com
password:Pasword123456
name:UserName
surname:UserSurname
nickname:UserNickname*/
api.route('/user')
	.post(userController.addUser);

module.exports = api;