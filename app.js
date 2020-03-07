/*Añadimos certificado, protocolo TLS para conexión*/
const https = require("https"),
fs = require("fs");

const options = {
  key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
  cert: fs.readFileSync("/srv/www/keys/chain.pem")
};

var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
mongoose = require('mongoose');

var url = "mongodb://localhost:27017/rateart_backend";

//DB connection
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Resources
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

// User routes
var user_routes = require('./routes/user');


//You can access to the routes with this links
app.use('/authentication', user_routes);

//Start node server
https.createServer(options, app).listen(8080, function() {
  console.log("Node server running on https://localhost:8080");
});
/*app.listen(3000, function() {
  console.log("Node server running on https://localhost:3000");
});*/
