const express = require('express');
const router = express.Router();

const ItemsController=require('../controller/itemController.js')

/* GET Items listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/item-add',ItemsController.createItem )
router.get('/item',ItemsController.getItems )
router.get('/items-category',ItemsController.getItemsByCategory )
router.get('/items-price',ItemsController.filterItems )
router.get('/item-description/:id',ItemsController.getOneItem )
router.put('/item-update',ItemsController.updateItem )
router.get('/delete-item',ItemsController.deleteItem )

module.exports = router;

