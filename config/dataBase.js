const { Sequelize } = require("sequelize");
require('dotenv').config();


module.exports = new Sequelize(
    process.env.DATA_BASE_NAME,
    process.env.USER_NAME,
    process.env.DB_ACCES_PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
    });
