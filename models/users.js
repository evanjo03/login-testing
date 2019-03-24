module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      score: DataTypes.INTEGER
    });
    return User;
  };