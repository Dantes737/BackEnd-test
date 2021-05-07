const express = require('express');
const router = express.Router();
const checkAuth=require('../auth-midlleware/check-auth.js');
const IndexController=require('../controllers/indexController.js');

//незареєстрований користувач може тільки переглядати сайт 
  
router.get('/',IndexController.openHomePage);
router.get('/add-item',checkAuth, IndexController.openAddItemPage);


module.exports = router;

