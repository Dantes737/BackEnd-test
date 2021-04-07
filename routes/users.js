const express = require('express');
const router = express.Router();

const UsersController=require('../controller/userController.js')


router.post('/user-sign-in',UsersController.signIN )
router.post('/user-login',UsersController.login )


module.exports = router;

