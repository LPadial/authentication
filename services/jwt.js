const jwt = require('jwt-simple');
const moment = require('moment');
const vault = require('./../provider/vault');
//'4+Md#67%q4J{5.J4:Gb5pHuyK';

exports.createToken = function(user){
  vault.read('secret/tokenJWT').then(
    (res) => {
      console.log("result:",res.data);
      const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        role: user.role,
        initTime: moment().unix(),
        expireTime: moment().add(30, 'days').unix()
      };
      return jwt.encode(payload, vault.read('secret/tokenJWT'));
    });  
};