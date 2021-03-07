var express = require('express');
var router = express.Router();

var ProductController = require('../controller/product.controller');

router.get('/', ProductController.getProducts);
router.get('/', ProductController.getProductSku);
router.post('/', ProductController.postProducts);
router.delete('/', ProductController.deleteProducts);
router.delete('/', ProductController.deleteProductsSku);
router.put('/', ProductController.putProducts);
patch.delete('/', ProductController.patchProducts);

module.exports = router;
