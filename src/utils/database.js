const Sequelize = require('sequelize');
const fs = require("fs");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  ssl: {
    cert: fs.readFileSync("../DigiCertGlobalRootG2.crt.pem")
  }
});

module.exports = sequelize;