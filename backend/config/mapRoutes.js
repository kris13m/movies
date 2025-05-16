const express = require('express');

const movieRoutes = require('../routes/movies');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const listRoutes = require('../routes/lists');

module.exports = function mapRoutes(app) {
  const apiRouter = express.Router();

  
  apiRouter.use('/movies', movieRoutes);
  apiRouter.use('/users', userRoutes);
  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/lists', listRoutes);

  
  app.use('/api', apiRouter); 
};