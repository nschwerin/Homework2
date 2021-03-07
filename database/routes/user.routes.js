var express = require('express');
var router = express.Router();

var UserController = require('../controller/user.controller');

router.get('/', UserController.getUsers);
router.get('/', UserController.getUsersSSN);
router.post('/', UserController.postUsers);
router.delete('/', UserController.deleteUsers);
router.delete('/', UserController.deleteUsersSSN);
router.put('/', UserController.putUsers);
patch.delete('/', UserController.patchUsers);

module.exports = router;
