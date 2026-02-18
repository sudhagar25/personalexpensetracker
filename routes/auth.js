const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register Page
router.get('/register', authController.registerPage);

// Register Handle
router.post('/register', authController.registerUser);

// Login Page
router.get('/login', authController.loginPage);

// Login Handle
router.post('/login', authController.loginUser);

// Logout Handle
router.get('/logout', authController.logoutUser);

module.exports = router;
