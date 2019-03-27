var db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function (app) {

    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (result) {
            res.json(result);
        });
    });

    app.post("/password", function (req, res) {
        db.User.findAll({}).then(function (result) {
            var currentUser;
            var userExists = false;

            for (var i = 0; i < result.length; i++) {
                if (result[i].username === req.body.username) {
                    //user is in the database, so set userExists to true
                    currentUser = result[i];
                    userExists = true;
                }
            }
            //if user exists, check for password
            if (userExists) {
                bcrypt.compare(req.body.password, currentUser.password, function (error, find) {
                    //send boolean to user with whether password is true or not
                    if (find) {
                        res.send("User logged in");
                    } else {
                        //send boolean to user with whether password is true or not
                        res.send("Incorrect password");
                    }
                });
            } else {
                res.send("Incorrect username")
            }
        })
    });

    app.post("/api/user", function (req, res) {
        var userExists = false;
        db.User.findAll({}).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].username === req.body.username) {
                    //user is in the database, so set userExists to true
                    userExists = true;
                }
            }
            if (!userExists) {
                var password = req.body.password;
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    // Store hash in your password DB.
                    if (err) throw err;
                    db.User.create({
                        username: req.body.username,
                        password: hash,
                        score: 0,
                        stress: 0,
                        currentQuestionId: 0
                    }).then(function (result) {
                        res.send(result);
                    })
                });
            } else {
                res.send("Username already exists, please try a different username!")
            }

        })
    });
}