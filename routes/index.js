const express = require('express');
const router = express.Router();

const IndexController=require('../controllers/indexController.js')

router.get('/',IndexController.openHomePage);
router.get('/add-item', IndexController.openAddItemPage);


module.exports = router;

