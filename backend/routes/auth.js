const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, registerValidationRules, loginValidationRules } = require('../middleware/userValidator');
const isAuthenticated = require('../middleware/authMiddleware');

router.post('/register', registerValidationRules, validate, authController.register);
router.post('/login', loginValidationRules, validate, authController.login);
router.get('/session', isAuthenticated, authController.getSession);
router.post('/logout', isAuthenticated, authController.logout);

module.exports = router;