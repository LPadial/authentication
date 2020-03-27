var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

//--------------------- USER AUTHENTICATED ---------------------

/*Para obtener todos los usuarios realizar get*/
api.route('/users')
	.get([md_checkLogin.ensureAuth, md_checkrole.checkAdminrole],userController.findAllUsers)

module.exports = api;