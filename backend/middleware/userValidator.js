const { validationResult, body } = require('express-validator');


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

const usernameValidator = (req, res, next) => {
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long');
  
  next();
};

module.exports = {
  validate,
  usernameValidator
};
