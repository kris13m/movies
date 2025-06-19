const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, registerValidationRules, loginValidationRules } = require('../middleware/userValidator');
const isAuthenticated = require('../middleware/authMiddleware');
const verifyCsrfTokenMiddleware = require('../middleware/verifyCsrfTokenMiddleware');

router.post('/register', registerValidationRules, validate, authController.register);
router.post('/login', loginValidationRules, validate, authController.login);
router.get('/session', isAuthenticated,  verifyCsrfTokenMiddleware, authController.getSession);
router.post('/logout', isAuthenticated,  verifyCsrfTokenMiddleware, authController.logout);

module.exports = router;