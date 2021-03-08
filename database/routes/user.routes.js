var express = require('express');
var router = express.Router();

var UserController = require('../controller/user.controller');

router.get('/user', UserController.getUsers);
router.get('/user/:ssn', UserController.getUsersSSN);
router.post('/user', UserController.postUsers);
router.delete('/user', UserController.deleteUsers);
router.delete('/user/:ssn', UserController.deleteUsersSSN);
router.put('/user/:ssn', UserController.putUsers);
patch.delete('/user/:ssn', UserController.patchUsers);

module.exports = router;
