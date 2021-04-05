const { Sequelize} = require("sequelize");
const db = require('../config/dataBase.js');

const Item = db.define("item", {
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    category: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.INTEGER
    }
});

module.exports = Item;