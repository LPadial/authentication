var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '4+Md#67%q4J{5.J4:Gb5pHuyK';

exports.createToken = function(user){
  var payload = {
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
  return jwt.encode(payload, secret);
};