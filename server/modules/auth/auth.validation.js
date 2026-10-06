// server/modules/auth/auth.validation.js
const { body } = require('express-validator');

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  body('phone')
    .optional()
    .matches(/^(\+91[-\s]?)?[6-9]\d{9}$/)
    .withMessage('Please provide a valid Indian phone number'),
];

module.exports = { loginValidation, registerValidation };