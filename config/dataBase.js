const { Sequelize} = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect:'postgres'
//   });
module.exports= new Sequelize('my_shop_db', 'postgres', 'p0tat0888', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
});
