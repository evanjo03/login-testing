var express = require('express');

var app = express();
var db = require("./models")


var PORT = 8000;
//express middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
require("./routing/routing")(app);

var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;