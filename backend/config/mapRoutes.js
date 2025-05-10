const express = require('express');

const movieRoutes = require('../routes/movies');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');

module.exports = function mapRoutes(app) {
  const apiRouter = express.Router();

  
  apiRouter.use('/movies', movieRoutes);
  apiRouter.use('/users', userRoutes);
  apiRouter.use('/auth', authRoutes);

  
  app.use('/api', apiRouter); 
};