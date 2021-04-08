const express = require('express');
const router = express.Router();
const checkAuth=require('../auth-midlleware/check-auth.js')
const ItemsController = require('../controllers/itemController.js')

//незареєстрований користувач може тільки переглядати сайт 
//але не змінювати дані

router.get('/item', ItemsController.getItems);
router.post('/item',checkAuth, ItemsController.createItem);        //<----
router.get('/items-category', ItemsController.getItemsByCategory);
router.get('/items-price', ItemsController.filterItems);
router.get('/item/:id', ItemsController.getOneItem);
router.post('/update-item',checkAuth, ItemsController.updateItem); //<---- 
router.get('/delete-item',checkAuth, ItemsController.deleteItem);  //<----

module.exports = router;

