const rootKey = "s.SWaTzVmKB39NnRYbDPy6u18H";


var options = {
  apiVersion: 'v1',
  endpoint: 'http://127.0.0.1:8200',
  token: rootKey
};

var vault = require("node-vault")(options);

module.exports = vault;

