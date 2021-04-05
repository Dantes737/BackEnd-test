const { Sequelize, Model, DataTypes } = require("sequelize");
// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect:'postgres'
//   });
const db = new Sequelize('my_shop_db', 'postgres', 'p0tat0888', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases:false
});
db.authenticate()
    .then(() => console.log('Data base connected...'))
    .catch(err => console.log('Error' + err))

const User = db.define("user", {

    name: {
        type: Sequelize.STRING
    },
    nick: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    hash: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.STRING
    }

});
module.exports=User;