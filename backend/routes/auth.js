const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, usernameValidator, passwordValidator } = require('../middleware/userValidator');
const authValidate = require('../middleware/authMiddleware');

// Register route with validation rules
router.post('/register',validate, usernameValidator, passwordValidator, authController.register);

router.post('/login',validate, usernameValidator, passwordValidator, authController.login);

router.get('/session', authController.getSession);

router.post('/logout', authValidate, authController.logout);

module.exports = router;