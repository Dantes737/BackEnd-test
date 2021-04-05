//---------------------- /utils/token.js ------------------------------
const jwt = require('jsonwebtoken');
require('dotenv').config()

const expiresIn = '60m'
const tokenKey = process.env.APP_TOKEN_SECRET   // Save in .env !!!

function parseBearer(bearer, headers) {
    let token=null
    if (bearer.startsWith('Bearer ')) {
       token = bearer.slice(7, bearer.length);
    }    
    const decoded = jwt.verify(token, prepareSecret(headers));
    return decoded;
}

function prepareToken(data, headers) {
    return jwt.sign(data, prepareSecret(headers), { expiresIn: '60m'});
}

function prepareSecret(headers) {
    return tokenKey + headers['user-agent'] + headers['accept-language'];
}

module.exports = { parseBearer, prepareToken };
