const { Sequelize, Model, DataTypes } = require("sequelize");

const db = new Sequelize('my_shop_db', 'postgres', 'p0tat0888', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});
db.authenticate()
    .then(() => console.log('Data base connected...'))
    .catch(err => console.log('Error' + err))

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