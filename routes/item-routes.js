const express = require('express');
const itemController = require('../controllers/item-controller');
const router = express.Router();
// /items => GET
router.get('/items',itemController.getItem);
// /items => POST
router.post('/items',itemController.postItem);

// /item/:id/:qty => PATCH
router.patch('/item/:id/',itemController.updatetItem);
module.exports = router;