const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: `cloudcollectivedatabase.mysql.database.azure.com`,
  dialect: 'mysql'
});

module.exports = sequelize;
