const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const isAuthenticated = require('../middleware/authMiddleware');

router.delete('/:id', isAuthenticated, usersController.deleteUser);
    
module.exports = router;