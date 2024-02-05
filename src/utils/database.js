const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  ssl: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, '..', 'DigiCertGlobalRootCA.crt.pem')).toString()
    }
  }
});

module.exports = sequelize;
