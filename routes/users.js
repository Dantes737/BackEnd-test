const express = require('express');
const router = express.Router();

const UsersController=require('../controller/userController.js')


router.post('/user-sign-in',UsersController.signIN )
router.post('/user-login',UsersController.login )

// router.get('/user',UsersController.getUsers )
// router.get('/user/:id',UsersController.getOneUser )
// router.put('/user',UsersController.createUser )
// router.delete('/user/:id',UsersController.createUser )

module.exports = router;

