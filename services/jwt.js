const jwt = require('jwt-simple');
const moment = require('moment');
const vault = require('./../provider/vault');

// --------------------- LOGIN CREATE TOKEN ---------------------

const createToken = (user) => {
  return vault.read('secret/tokenJWT').then(
    (res) => {
      let secret = res.data.secret;
      const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        role: user.role,
        initTime: moment().unix(),
        expireTime: moment().add(1, 'hours').unix()
      };
      return jwt.encode(payload, secret);
    });
};

module.exports = createToken;
