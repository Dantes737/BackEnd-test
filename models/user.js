const { Sequelize} = require("sequelize");
const db=require('../config/dataBase.js');


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