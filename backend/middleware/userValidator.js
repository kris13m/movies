const { body, validationResult } = require('express-validator');

// this function is a universal error checker.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  next();
};


const usernameValidationRules = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters long')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Username must only contain letters, numbers, hyphens (-), and underscores (_)'),
];


const passwordValidationRules = [
    body('password')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must include at least one uppercase letter, one lowercase letter, and one number'),
];


const registerValidationRules = [
    ...usernameValidationRules,
    ...passwordValidationRules
];

// For login, we just need to ensure the fields aren't empty.
// The controller will handle if the credentials are actually correct.
const loginValidationRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules,
};
