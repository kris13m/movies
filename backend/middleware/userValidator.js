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

const usernameValidator = async (req, res, next) => {
  await body('username')
    .isLength({ min: 6 })
    .withMessage('Username must be at least 3 characters long')
    .isLength({ max: 20 })
    .withMessage('Username must be less than 20 characters long')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Username must only contain letter a-z, numbers, - and _')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validate,
  usernameValidator
};
