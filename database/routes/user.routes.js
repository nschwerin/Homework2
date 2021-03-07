var express = require('express');
var router = express.Router();

var UserController = require('../controller/user.controller')

router.get('/', UserController.getUsers)

module.exports = router;
