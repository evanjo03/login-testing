var db = require("../models");


module.exports = function (app) {
    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (result) {
            res.json(result);
        })
    })
    app.post("/api/user", function (req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            score: req.body.score
        }).then(function (result) {
            res.json(result);
        })
    })
};