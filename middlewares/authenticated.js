var jwt = require('jwt-simple');
var moment = require('moment');
var vault = require('../provider/vault');

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    console.log('No hay cabecera de autenticación')
    return res.status(403).send({message: 'No hay cabecera de autenticación'})
  }

  vault.read('secret/tokenJWT')
    .then((res) => {
      var secret = res.data.secret;
      var token = req.headers.authorization.replace(/['"]+/g, '');

      try{
        var payload = jwt.decode(token, secret);
        if(payload.expireTime <= moment().unix()){
          console.log('Token ha expirado')
          return res.status(401).send({message: 'Token ha expirado'});
        }
      }catch(ex){
        console.log(ex);
        console.log('Token no válido')
        return res.status(404).send({message: 'Token no válido'});
      }

      req.user = payload;

      next();

    })
    .catch((err) => next());  
};
