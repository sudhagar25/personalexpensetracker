const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const transactionController = require('../controllers/transactionController');

// Home Page (Welcome)
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render('welcome');
    }
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, transactionController.getDashboard);

module.exports = router;
