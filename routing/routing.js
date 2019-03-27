var db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function (app) {

    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (result) {
            res.json(result);
        });
    });
    
    app.post("/api/user", function (req, res) {
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
                res.json(result);
            })
        });
    })
};