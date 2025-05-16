const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, usernameValidator, passwordValidator } = require('../middleware/userValidator');

// Register route with validation rules
router.post('/register',validate, usernameValidator, passwordValidator, authController.register);

router.post('/login',validate, usernameValidator, passwordValidator, authController.login);


module.exports = router;