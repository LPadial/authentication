var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');


/*Para obtener el token realizar un Post con:
nickname o email del usuario(campos nickname o email), password (campo pasword) y gethash=true
Para obtener los datos del usuario realizar un post con los campos anteriores son el gethash
email: admin@ddss.com
nickname:Administrator
password:Admin123456
gethash:true
*/
api.route('/user/login')
	.post(userController.loginUser);
, 

module.exports = api;