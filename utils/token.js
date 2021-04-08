//---------------------- /utils/token.js ------------------------------
const jwt = require('jsonwebtoken');
require('dotenv').config()

const expiresIn = '60m'
const tokenKey = process.env.APP_TOKEN_SECRET  

function prepareToken(data) {
    return jwt.sign(data, tokenKey, { expiresIn: expiresIn});
};


module.exports = { prepareToken };
