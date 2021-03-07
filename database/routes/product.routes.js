var express = require('express');
var router = express.Router();

var ProductController = require('../controller/product.controller');

router.get('/', ProductController.getProducts);
router.get('/:sku', ProductController.getProductSku);
router.post('/', ProductController.postProducts);
router.delete('/', ProductController.deleteProducts);
router.delete('/:sku', ProductController.deleteProductsSku);
router.put('/:sku', ProductController.putProducts);
patch.delete('/:sku', ProductController.patchProducts);

module.exports = router;
