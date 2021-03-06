var express = require('express');
var router = express.Router();

var ProductController = require('../controller/product.controller');

router.get('/product', ProductController.getProducts);
router.get('/product/:sku', ProductController.getProductsSku);
router.post('/product', ProductController.postProducts);
router.delete('/product', ProductController.deleteProducts);
router.delete('/product/:sku', ProductController.deleteProductsSku);
router.put('/product/:sku', ProductController.putProducts);
router.patch('/product/:sku', ProductController.patchProducts);

module.exports = router;
