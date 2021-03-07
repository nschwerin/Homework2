var express = require('express');
var router = express.Router();

var UserController = require('../controller/user.controller');

router.get('/', UserController.getUsers);
router.get('/:ssn', UserController.getUsersSSN);
router.post('/', UserController.postUsers);
router.delete('/', UserController.deleteUsers);
router.delete('/:ssn', UserController.deleteUsersSSN);
router.put('/:ssn', UserController.putUsers);
patch.delete('/:ssn', UserController.patchUsers);

module.exports = router;
