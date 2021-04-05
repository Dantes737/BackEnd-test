const db = require('../db.js')

class UsersController {
  
  
    async createUser(req, res) {
        const { name, nick, salt, hash,email } = req.body
        console.log(name, nick, salt, hash,email);
        const newUser=await db
        .query(`INSERT INTO person(name, nick, salt, hash,email) values ($1,$2,$3,$4,$5) RETURNING *`, [name, nick, salt, hash,email])
        res.json(newUser.rows[0])

    };

    async getUsers(req, res) {

    };
    async getOneUser(req, res) {

    };
    async updateUser(req, res) {

    };
    async deleteUser(req, res) {

    };

};


module.exports = new UsersController();