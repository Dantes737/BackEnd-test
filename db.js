const Pool=require('pg').Pool;

const pool=new Pool({
    user:'postgres',
    password:'p0tat0888',
    host:'localhost',
    port:5432,
    database:'my_shop_db'
});
module.exports =pool;