const crypto = require("crypto");
const { prepareToken } = require("../utils/token");
const User = require('../models/user.js');
require('dotenv').config();

class UsersController {
    //------------Реєстрація нового користувача-----------------------
    async signIN(req, res) {

        let validateEmail = (email) => {
            var regEx = /\S+@\S+\.\S+/;
            return regEx.test(email);
        }
        let validatePassword = (password) => {
            var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regEx.test(password);
        }
        if (!req.body.name) {
            return res.status(401).json({ error: "Name is required" });
        }
        if (!req.body.nick) {
            return res.status(401).json({ error: "Nick is required" });
        }
        if (!req.body.email) {
            return res.status(401).json({ error: "Email is required" });
        }
        if (!validateEmail(req.body.email)) {
            return res.status(401).json({ error: "Not valid email" });
        }
        if (!validatePassword(req.body.password)) {
            return res.status(401).json({ error: "Not valid password. Should contain at least one digit,one lower case,one upper case, at least 8 from the mentioned characters" });
        }
        if (!req.body.password) {
            return res.status(401).json({ error: "Password is required" });
        }

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
        await User.create({
            name, nick, salt, hash, email
        })
            .then((user) => {
                // console.log(user);

                const token = prepareToken(
                    {
                        id: user.id,
                        nick: user.nick,
                    }
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
    //-------------------Логінізація користувача-----------------------
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
                const myUser = user.dataValues;
                console.log(user);
                //////////////////////////////////////////////
                function validPassword(password, salt) {
                    //----------- Формуємо хеш переданого (для перевірки) пароля ----
                    const hash = crypto
                        .pbkdf2Sync(password, salt, 10000, 512, "sha512")
                        .toString("hex");
                    //------------ Перевіряємо, чи одержано такий же хеш як у базі -------------
                    return hash;
                };
                ////////////////////////////////////////////////
                const loginHash = validPassword(req.body.password, myUser.salt);
                const signInHash = myUser.hash;
                // console.log(`HASH-1:${loginHash}`);
                // console.log(`HASH-2:${signInHash}`);


                if (!myUser) {
                    return res.status(401).json({ error: "User not found" });
                }
                if (!loginHash === signInHash) {
                    console.log("TRUE");
                    return res.status(401).json({ error: "Pass error" });
                }

                const token = prepareToken(
                    {
                        id: myUser.id,
                        nick: myUser.nick,
                    }
                );

                const expiresAt = new Date().getTime() + 36000000;

                res.status(200).json({
                    result: "Authorized",
                    user: {
                        authData: {
                            name: myUser.name,
                            nick: myUser.nick,
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
};


module.exports = new UsersController();