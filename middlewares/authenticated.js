var jwt = require('jwt-simple');
var moment = require('moment');
var vault = require('../provider/vault');

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    console.log('No hay cabecera de autenticación');
    return res.status(403).send({message: 'No hay cabecera de autenticación'});
  }

  return vault.read('secret/tokenJWT')
    .then((sec) => {
      let secret = sec.data.secret;
      let token = req.headers.authorization.replace(/['"]+/g, '');
      let payload = jwt.decode(token,secret);

      console.log("payload: " + payload);
      try{
        if(payload.expireTime <= moment().unix()){
          console.log('Token ha expirado');
          return res.status(401).send({message: 'Token ha expirado'});
        }
      }catch(ex){
        console.log("Error: " + ex);
        console.log('Token no válido');
        return res.status(404).send({message: 'Token no válido'});
      }
      req.user = payload;
      next();
   }).catch((err) => {
      console.log("Error: " + err);
      console.log('Token no válido');
      return res.status(404).send({message: 'Token no válido'});
   });
   
};
