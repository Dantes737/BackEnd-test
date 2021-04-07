const express = require('express');
const router = express.Router();

const ItemsController = require('../controller/itemController.js')

router.get('/item', ItemsController.getItems);
router.post('/item', ItemsController.createItem);
router.get('/items-category', ItemsController.getItemsByCategory);
router.get('/items-price', ItemsController.filterItems);
router.get('/item/:id', ItemsController.getOneItem);
router.post('/update-item', ItemsController.updateItem);
router.get('/delete-item', ItemsController.deleteItem);

module.exports = router;

