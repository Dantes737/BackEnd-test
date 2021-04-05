const express = require('express');
const router = express.Router();

const UsersController=require('../controller/userController.js')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/user',UsersController.createUser )
router.get('/user',UsersController.getUsers )
router.get('/user/:id',UsersController.getOneUser )
router.put('/user',UsersController.createUser )
router.delete('/user/:id',UsersController.createUser )

module.exports = router;

