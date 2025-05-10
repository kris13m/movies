const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/userValidator');

// Register route with validation rules
router.post('/register',validate, authController.register);

router.post('/login',validate, authController.login);


module.exports = router;