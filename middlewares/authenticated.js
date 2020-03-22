var jwt = require('jwt-simple');
var moment = require('moment');
var vault = require('../provider/vault');

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    console.log('No hay cabecera de autenticación');
    return res.status(403).send({message: 'No hay cabecera de autenticación'});
  }

  return vault.read('secret/tokenJWT')
    .then((res) => {
      let secret = res.data.secret;
      let token = req.headers.authorization.replace(/['"]+/g, '');
      return jwt.decode(token,secret);
    }).then((payload) => {
      console.log("payload: " + payload);
      if(payload.expireTime <= moment().unix()){
          console.log('Token ha expirado');
          return res.status(401).send({message: 'Token ha expirado'});
      }else{
	return payload;
      }
    }).catch((ex) => {
      console.log("Error: " + ex);
      console.log('Token no válido');
      return res.status(404).send({message: 'Token no válido'});
    }).then((p) => {
	console.log("payload: " + p.expireTime);
	req.user = p;
	next();
    }).catch((err) => {
	console.log("Error: " + err);
	next();
    });

    next();
};
