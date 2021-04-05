const db = require('../db.js')
const crypto = require("crypto");
const { prepareToken } = require("../utils/token");


class UsersController {
    //---------------- Функція для перевірки правильності пароля ------------
    // validPassword(password) {
    //     //----------- Формуємо хеш переданого (для перевірки) пароля ----
    //     const hash = crypto
    //         .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    //         .toString("hex");
    //     //------------ Перевіряємо, чи одержано такий же хеш як у базі -------------
    //     return this.hash === hash;
    // };

    async createUser(req, res) {
        const { name, nick, email, password } = req.body
        let salt;
        let hash;
        function setPassword(password) {
            salt = crypto.randomBytes(16).toString("hex");
            hash = crypto
                .pbkdf2Sync(password, salt, 10000, 512, "sha512")
                .toString("hex");
        };
        setPassword(password);
        console.log(name, nick, salt, hash, email);
        const newUser = await db
            .query(`INSERT INTO person(name, nick, salt, hash,email) values ($1,$2,$3,$4,$5) RETURNING *`, [name, nick, salt, hash, email])
        // res.json(newUser.rows[0].id)
        ////////////////////////////////////////
        //////////////////////
        user.save()
        .then((user) => {
          const token = prepareToken(
            {
              id: user._id,
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

    async getUsers(req, res) {

    };
    async getOneUser(req, res) {

    };
    async updateUser(req, res) {

    };
    async deleteUser(req, res) {

    };

};


// router.post(
//     "/signup",

//     function (req, res) {
//         console.log("req.headers");
//         console.log(req.headers);

//         var user = new User({
//             email: req.body.email,
//             nick: req.body.nick,
//         });
//         user.setPassword(req.body.password);
//         user.save()
//             .then((user) => {
//                 const token = prepareToken(
//                     {
//                         id: user._id,
//                         nick: user.nick,
//                     },
//                     req.headers
//                 );
//                 return res.status(201).json({
//                     result: "Signuped successfully",
//                     token,
//                 });
//             })
//             .catch((err) => {
//                 return res.status(500).json({ error: "Signup error" });
//             });
//     }
// );
// router.post("/login", function (req, res) {
//     if (!req.body.email) {
//         return res.status(401).json({ error: "Email is required" });
//     }
//     if (!req.body.password) {
//         return res.status(401).json({ error: "Password is required" });
//     }
//     User.findOne({ email: req.body.email })
//         .exec()
//         .then((user) => {
//             if (!user) {
//                 return res.status(401).json({ error: "User not found" });
//             }
//             if (!user.validPassword(req.body.password)) {
//                 return res.status(401).json({ error: "Pass error" });
//             }
//             const token = prepareToken(
//                 {
//                     id: user._id,
//                     nick: user.nick,
//                 },
//                 req.headers
//             );
//             const expiresAt = new Date().getTime() + 36000000;
//             res.status(200).json({
//                 result: "Authorized",
//                 user: {
//                     authData: {
//                         nick: user._doc.nick,
//                         access_token: token,
//                     },
//                     expiresAt,
//                 },
//             });
//         })
//         .catch((err) => {
//             return res.status(401).json({ error: "Login error" });
//         });
// });



module.exports = new UsersController();