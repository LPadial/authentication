/*Añadimos certificado, protocolo TLS para conexión*/
const https = require("https"),
fs = require("fs");

var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
mongoose = require('mongoose');

var url = "mongodb://127.0.0.1:27017/authentication";

//DB connection
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Resources
app.use('/public', express.static(__dirname + '/public', { dotfiles: 'allow'})); //Serves resources from public folder

// User routes
var user_routes = require('./routes/user');

//You can access to the routes with this links
app.use('/authentication', user_routes);

//Start node server
app.listen(80, function() {
  console.log("Node server running on http://localhost:80");
});
