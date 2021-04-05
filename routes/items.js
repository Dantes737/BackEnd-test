const express = require('express');
const router = express.Router();

const ItemsController=require('../controller/itemController.js')

/* GET Items listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/item-add',ItemsController.createItem )
router.get('/item',ItemsController.getItems )
router.get('/item',ItemsController.getItemByUser )
router.get('/item/:id',ItemsController.getOneItem )
router.put('/item',ItemsController.updateItem )
router.delete('/item/:id',ItemsController.deleteItem )

module.exports = router;

