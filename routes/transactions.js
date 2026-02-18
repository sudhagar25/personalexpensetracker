const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const transactionController = require('../controllers/transactionController');

// Add Transaction Page
router.get('/add', ensureAuthenticated, transactionController.getAddTransaction);

// Process Add Transaction
router.post('/add', ensureAuthenticated, transactionController.addTransaction);

// Delete Transaction
router.delete('/:id', ensureAuthenticated, transactionController.deleteTransaction);

module.exports = router;
