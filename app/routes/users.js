const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
//add user controller and user service

// get verify_api_key middleware for verifying auth keys
const { verifyAuthKey } = require('../middleware/verify_api_key');


router.post('/login', verifyAuthKey, userController.login);
router.post('/getScheme', verifyAuthKey, userController.getScheme);

//router.post('/dashboard', verifyAuthKey, userController.dashboard)

module.exports = router;