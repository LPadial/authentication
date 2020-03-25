var User = require('../models/user');

// --------------------- ADMIN PERMISSIONS ---------------------

exports.checkAdminrole = function(req, res, next){
  if(req.user.role != 'admin') return res.status(550).send({message: 'No tiene permisos para realizar esta acción.'});
  next();
};
