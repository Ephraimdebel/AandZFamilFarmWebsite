const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const { body, validationResult } = require('express-validator');

// ✅ Signup Route
router.post(
  '/signup',
  [
    body('name')
      .notEmpty()
      .withMessage('Full name is required'),

    // Custom check: either email or phone is required
    body().custom((value, { req }) => {
      if (!req.body.email && !req.body.phone) {
        throw new Error('Either email or phone is required');
      }
      return true;
    }),

    // Validate email if provided
    body('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email format'),

    // Validate phone if provided
    body('phone')
      .optional()
      .matches(/^(\+1)?\d{10}$/)
      .withMessage('Phone must be a valid US number (e.g., +11234567890 or 1234567890)'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
      
    body('role')
        .notEmpty()
        .withMessage('admin role is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signup
);

// ✅ Login Route
router.post(
  '/login',
  [
    // Custom check: email or phone required
    body().custom((value, { req }) => {
      if (!req.body.identifier) {
        throw new Error('Email or phone is required');
      }
      return true;
    }),

    // Validate email if identifier looks like email
    body('identifier').custom((value) => {
      if (value.includes('@')) {
        if (!/\S+@\S+\.\S+/.test(value)) {
          throw new Error('Invalid email format');
        }
      } else {
        if (!/^(\+1)?\d{10}$/.test(value)) {
          throw new Error('Phone must be a valid US number');
        }
      }
      return true;
    }),

    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
