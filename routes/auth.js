const express = require('express');
const { body } = require('express-validator');

const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const authController = require('../controllers/auth');
const ErrorService = require('../utils/error-service');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value, { _req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new ErrorService(401, 'This E-Mail already exists!');
        }
        return true;
      })
      .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and at least 3 characters')
      .isLength({ min: 3 })
      .isAlphanumeric()
      .trim(),
    body('name', 'Please enter a correct "name" field').trim().not().isEmpty(),
  ],
  authController.signup,
);

router.post('/login', authController.login);

router.get('/status', checkAuth, authController.getUserStatus);
router.patch(
  '/status',
  checkAuth,
  [body('status', 'Please enter a correct status value').trim().not().isEmpty()],
  authController.updateUserStatus,
);

module.exports = router;
