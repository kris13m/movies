const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const isAuthenticated = require('../middleware/authMiddleware');
const verifyCsrfTokenMiddleware = require('../middleware/verifyCsrfTokenMiddleware');

router.delete('/:id', isAuthenticated,  verifyCsrfTokenMiddleware, usersController.deleteUser);
    
module.exports = router;