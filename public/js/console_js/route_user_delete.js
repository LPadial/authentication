var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

//--------------------- USER AUTHENTICATED ---------------------

/*Para buscar un usuario por id realizar un get con su id como parametro
 *Para eliminar un usuario por id realizar un delete con su id como parametro
*/
api.route('/user/:id')
	.get(md_checkLogin.ensureAuth, userController.findById)
	.delete([md_checkLogin.ensureAuth, md_checkrole.checkAdminrole], userController.deleteUser);