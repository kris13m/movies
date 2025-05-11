const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, usernameValidator } = require('../middleware/userValidator');

// Register route with validation rules
router.post('/register',validate, usernameValidator, authController.register);

router.post('/login',validate, authController.login);


module.exports = router;