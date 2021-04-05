const crypto = require("crypto");
const { prepareToken } = require("../utils/token");
const User = require('../models/user.js');
const { log } = require("console");

class UsersController {
    // ---------------- Функція для перевірки правильності пароля ------------
    // validPassword(password) {
    //     //----------- Формуємо хеш переданого (для перевірки) пароля ----
    //     const loginHash = crypto
    //         .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    //         .toString("hex");
    //     //------------ Перевіряємо, чи одержано такий же хеш як у базі -------------
    //     return loginHash;
    // };

    async signIN(req, res) {
        let salt;
        let hash;
        const { name, nick, email, password } = req.body;

        function setPassword(password) {
            salt = crypto.randomBytes(16).toString("hex");
            hash = crypto
                .pbkdf2Sync(password, salt, 10000, 512, "sha512")
                .toString("hex");
        };
        setPassword(password);
        console.log(name, nick, salt, hash, email);
        User.create({
            name, nick, salt, hash, email
        })
            .then((user) => {
                const token = prepareToken(
                    {
                        id: user.id,
                        nick: user.nick,
                    },
                    req.headers
                );
                return res.status(201).json({
                    result: "Signuped successfully",
                    token,
                });
            })
            .catch((err) => {
                return res.status(500).json({ error: "Signup error" });
            });
    };

    async login(req, res) {
        if (!req.body.email) {
            return res.status(401).json({ error: "Email is required" });
        }
        if (!req.body.password) {
            return res.status(401).json({ error: "Password is required" });
        }

        await User.findOne({ where: { email: req.body.email } })
            // .exec()
            .then((user) => {
                const signInHasg=user.hash;
                //////////////////////////////////////////////
                function validPassword(password) {
                    //----------- Формуємо хеш переданого (для перевірки) пароля ----
                    const loginHash = crypto
                        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
                        .toString("hex");
                    //------------ Перевіряємо, чи одержано такий же хеш як у базі -------------
                    return loginHash;
                };
                ////////////////////////////////////////////////

                if (!user) {
                    return res.status(401).json({ error: "User not found" });
                }
                if (validPassword(req.body.password) === signInHasg) {
                    console.log("TRUE");
                    return res.status(401).json({ error: "Pass error" });
                }
                const token = prepareToken(
                    {
                        id: user.id,
                        nick: user.nick,
                    },
                    req.headers
                );
                const expiresAt = new Date().getTime() + 36000000;
                res.status(200).json({
                    result: "Authorized",
                    user: {
                        authData: {
                            name: user.name,
                            nick: user.nick,
                            access_token: token,
                        },
                        expiresAt,
                    },
                });
            })
            .catch((err) => {
                return res.status(401).json({ error: "Login error" });
            });
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