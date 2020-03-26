var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

//--------------------- USER AUTHENTICATED ---------------------

/*Para obtener todos los usuarios realizar get,
para añadir un usuario realizar post con los siguientes campos:
email:lpadial@ddss.com
password:123456
name:Laura
surname:Padial
nickname:lpadial*/
api.route('/users')
	.get([md_checkLogin.ensureAuth, md_checkrole.checkAdminrole],userController.findAllUsers)
	.post(userController.addUser);

api.route('/users/:id')
	.get(md_checkLogin.ensureAuth, userController.findById)
	.put(md_checkLogin.ensureAuth, userController.updateUser);

/*Para obtener el token realizar un Post con:
nickname o email del usuario(campos nickname o email), password (campo pasword) y gethash=true
Para obtener los datos del usuario realizar un post con los campos anteriores son el gethash
nickname:lpadial
password:123456
gethash:true
*/
api.route('/user/login')
	.post(userController.loginUser);

/*Para buscar un usuario por id realizar un get con su id como parametro
 *Para eliminar un usuario por id realizar un delete con su id como parametro
*/
api.route('/user/:id')
	.get(md_checkLogin.ensureAuth, userController.findById)
	.delete([md_checkLogin.ensureAuth, md_checkrole.checkAdminrole], userController.deleteUser);




//--------------------- USER NOT AUTHENTICATED ---------------------

/*Para añadir un usuario realizar post con los siguientes campos:
email:lpadial@ddss.com
password:123456
name:Laura
surname:Padial
nickname:lpadial*/
api.route('/user')
	.post(userController.addUser);

//md_checkLogin.ensureAuth, 
//[md_checkLogin.ensureAuth, md_checkrole.checkAdminrole], 

module.exports = api;