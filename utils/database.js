const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_db", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
