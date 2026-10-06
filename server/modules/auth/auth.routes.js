// server/modules/auth/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { loginValidation, registerValidation } = require('./auth.validation');

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);
router.post('/refresh', authController.refreshToken);

module.exports = router;