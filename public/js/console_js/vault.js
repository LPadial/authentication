const rootKey = process.env.rootKey; // Key to open vault

// --------------------- VAULT CONFIGURATION ---------------------

var options = {
  apiVersion: 'v1',
  endpoint: 'http://127.0.0.1:8200',
  token: rootKey
};

var vault = require("node-vault")(options);

module.exports = vault;

